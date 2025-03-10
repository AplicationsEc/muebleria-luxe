import * as SQLite from "expo-sqlite";
import { IProducto } from "../ts/Models/IProducto";
import { IUser } from "../ts/Models/IUser";

// Abre la base de datos
const db = await SQLite.openDatabaseAsync("prime");

// Configuración inicial de la base de datos
await db.execAsync(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY NOT NULL, email TEXT NOT NULL, username TEXT NOT NULL, contrasena TEXT NOT NULL);
`);

// Función para crear un nuevo registro
async function createRecord(user: IUser) {
  const result = await db.runAsync(
    "INSERT INTO user (email, username, contrasena) VALUES (?, ?, ?)",
    user.email,
    user.username,
    user.contrasena
  );
  console.log("Inserted Row ID:", result.lastInsertRowId);
  console.log("Number of Changes:", result.changes);
}

// Función para leer todos los registros
async function readAllRecords() {
  const allRows = await db.getAllAsync("SELECT * FROM user");
  return allRows;
}

// Función para leer un solo registro por ID
async function readRecordById(id: number) {
  const row = await db.getFirstAsync("SELECT * FROM producto WHERE id = ?", id);
  return row;
}

// Función para actualizar un registro
async function updateRecord(user: IUser) {
  await db.runAsync(
    "UPDATE producto SET username = ?, contrasena = ? WHERE id = ?",
    user.username,
    user.contrasena,
    user.id
  );
}
