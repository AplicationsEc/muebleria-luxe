import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/db/drizzle"; // Conexión a la BD
import { conversations, messagesDb, users } from "@/db/schema"; // Esquema de Drizzle
import { eq } from "drizzle-orm";
import { IFormulaCabeceraDetalle } from "@/ts/IFormulaCabecera";
import { obtenerOpcionesCotizacion } from "@/services/obtenerOpcionesCotizacion";
import { construirPromptSistema } from "@/prompt/initial";
import openai from "@/lib/openai";
import { toolsFunctions } from "@/prompt/toolFunctions";
import { cotizacionAPI } from "@/api/cotizacion";
import { obtenerOpcionesMaterial } from "@/services/obtenerMateriales";
import { IMaterial } from "@/ts/IMateriales";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
    });
  }

  const { messages, conversationId } = await req.json();

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "Mensajes inválidos" }), {
      status: 400,
    });
  }

  let conversationUuid = conversationId;
  const lastMessage = messages[messages.length - 1]; // Tomamos solo el último mensaje enviado por el usuario

  try {
    const opcionesCotizacion: IFormulaCabeceraDetalle[] =
      await obtenerOpcionesCotizacion();

    const opcionesMateriales: IMaterial[] = await obtenerOpcionesMaterial();

    // Construir el prompt del sistema dinámicamente
    const systemPrompt = {
      role: "system",
      content: construirPromptSistema(opcionesCotizacion, opcionesMateriales),
    };

    // Si no hay conversationId, creamos una nueva conversación
    if (!conversationUuid) {
      conversationUuid = uuidv4();
      const usuario = await db
        .select({ usuUuid: users.usuUuid })
        .from(users)
        .where(eq(users.usuEmail, session.user.email!))
        .limit(1);

      await db.insert(conversations).values({
        conUuid: conversationUuid,
        usuUuid: usuario[0].usuUuid,
        conTitle: lastMessage.content.substring(0, 50) + "...",
      });
    }

    // Insertar solo el último mensaje del usuario en la base de datos
    await db.insert(messagesDb).values({
      mesUuid: uuidv4(),
      conUuid: conversationUuid,
      conRole: lastMessage.role,
      conContent: lastMessage.content,
    });

    // Construimos la conversación sin necesidad de consultar la BD nuevamente
    const conversationHistory = [systemPrompt, ...messages];

    // Crear un TransformStream para manejar el streaming
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Iniciar una respuesta de streaming
    const response = new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });

    // Procesar en segundo plano
    (async () => {
      try {
        const openaiStream = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: conversationHistory,
          stream: true,
          tools: toolsFunctions,
          tool_choice: "auto",
        });

        let assistantResponse = "";
        const currentToolCalls = [];
        let isProcessingToolCall = false;

        for await (const chunk of openaiStream) {
          const choice = chunk.choices[0]?.delta;

          // Manejar herramientas (tool_calls)
          if (choice?.tool_calls && choice.tool_calls.length > 0) {
            isProcessingToolCall = true;

            for (const toolCallDelta of choice.tool_calls) {
              const { index, id, type, function: func } = toolCallDelta;

              // Si es un nuevo tool_call, inicializamos en el array
              if (id && !currentToolCalls[index]) {
                currentToolCalls[index] = {
                  id,
                  type,
                  function: { name: func?.name || "", arguments: "" },
                };
              }

              // Acumulamos los argumentos
              if (func?.arguments) {
                if (!currentToolCalls[index]) {
                  currentToolCalls[index] = {
                    function: { name: func?.name || "", arguments: "" },
                  };
                }
                currentToolCalls[index].function.arguments += func.arguments;
              }
            }
            continue;
          }

          // Procesar respuestas normales del asistente
          if (choice?.content) {
            assistantResponse += choice.content;
            const data = `data: ${JSON.stringify({
              choices: [{ delta: { content: choice.content } }],
            })}\n\n`;
            await writer.write(encoder.encode(data));
          }
        }

        // Ejecutar las funciones si existen tool_calls completos
        if (isProcessingToolCall && currentToolCalls.length > 0) {
          console.log(
            "🔹 Tool calls completos:",
            JSON.stringify(currentToolCalls)
          );

          for (const toolCall of currentToolCalls) {
            if (!toolCall || !toolCall.function) continue;

            console.log(toolCall.function);

            const { name } = toolCall.function;
            const functionArguments = toolCall.function.arguments;

            try {
              const parsedArgs = JSON.parse(functionArguments);
              let functionResponse;

              // Ejecutar la función correspondiente según el nombre
              switch (name) {
                case "calcular_troquel":
                  functionResponse = await cotizacionAPI.calcularTroquel(
                    parsedArgs.tipo_producto,
                    parsedArgs
                  );
                  break;

                case "cotizar_shopping_bag_con_impresion_offset":
                  functionResponse = await cotizacionAPI.cotizar(
                    "shopping-bag-con-impresion-offset",
                    parsedArgs
                  );
                  break;

                case "cotizar_shopping_bag_con_impresion_laser":
                  functionResponse = await cotizacionAPI.cotizar(
                    "shopping-bag-con-impresion-laser",
                    parsedArgs
                  );
                  break;

                case "cotizar_shopping_bag_sin_impresion":
                  functionResponse = await cotizacionAPI.cotizar(
                    "shopping-bag-sin-impresion",
                    parsedArgs
                  );
                  break;

                case "cotizar_material_sin_impresion":
                  functionResponse = await cotizacionAPI.cotizar(
                    "material-sin-impresion",
                    parsedArgs
                  );
                  break;

                default:
                  console.log("Función no implementada:", name);
                  throw new Error(`Función desconocida: ${name}`);
              }

              if (functionResponse) {
                // Formatear la respuesta según el tipo de función
                let formattedResponse = "";

                if (name === "calcular_troquel") {
                  formattedResponse = `### Resultado del cálculo de troquel:\n\n**Fórmula:** ${functionResponse.formula}\n\n`;

                  for (const [key, value] of Object.entries(
                    functionResponse.resultados
                  )) {
                    formattedResponse += `- **${key.replace(
                      /_/g,
                      " "
                    )}:** ${value}\n`;
                  }

                  // Agregar mensaje para continuar con el proceso
                  formattedResponse +=
                    "\n\n¿Deseas continuar con la cotización? Ahora necesitamos definir los detalles adicionales para completar la cotización.";
                } else {
                  // Para cotizaciones finales
                  formattedResponse = `### Cotización final:\n\n**Fórmula:** ${functionResponse.formula}\n\n`;

                  for (const [key, value] of Object.entries(
                    functionResponse.resultados
                  )) {
                    formattedResponse += `- **${key.replace(/_/g, " ")}:** ${
                      typeof value === "number" ? value.toFixed(2) : value
                    }\n`;
                  }
                }

                // Mensaje del asistente con la respuesta de la herramienta
                const toolResponseMessage = `\n\n${formattedResponse}`;

                // Añadimos la respuesta a la conversación
                assistantResponse += toolResponseMessage;

                // Añadimos el mensaje al contexto de la conversación
                conversationHistory.push({
                  role: "assistant",
                  content: toolResponseMessage,
                });

                // Ahora enviamos la respuesta al cliente
                await writer.write(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      choices: [
                        {
                          delta: {
                            content: toolResponseMessage,
                          },
                        },
                      ],
                    })}\n\n`
                  )
                );
              }
            } catch (error) {
              console.error("🔴 Error procesando función:", error);

              const errorMsg =
                "\n\nHubo un error al procesar la función. Por favor, inténtalo de nuevo.";

              // Añadimos el error al contexto de la conversación
              conversationHistory.push({
                role: "assistant",
                content: errorMsg,
              });

              await writer.write(
                encoder.encode(
                  `data: ${JSON.stringify({
                    choices: [{ delta: { content: errorMsg } }],
                  })}\n\n`
                )
              );

              assistantResponse += errorMsg;
            }
          }
        }

        // Guardamos la respuesta completa en la BD
        if (assistantResponse.trim()) {
          await db.insert(messagesDb).values({
            mesUuid: uuidv4(),
            conUuid: conversationUuid,
            conRole: "assistant",
            conContent: assistantResponse,
          });
        }

        await writer.write(encoder.encode("data: [DONE]\n\n"));
      } catch (error) {
        console.error("Error procesando el stream:", error);
        await writer.write(
          encoder.encode(
            `data: ${JSON.stringify({
              error: "Error procesando la respuesta",
            })}\n\n`
          )
        );
      } finally {
        await writer.close();
      }
    })();

    return response;
  } catch (error) {
    console.error("Error al comunicarse con OpenAI:", error);
    return new Response(
      JSON.stringify({ error: "Error al procesar la solicitud" }),
      {
        status: 500,
      }
    );
  }
}
