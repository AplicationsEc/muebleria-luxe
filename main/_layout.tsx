import { View } from "react-native";
import { SpinerProcesando } from "../ui/SpinerProcesando";

export const RootApp = () => {
  return (
    <View>
      <SpinerProcesando msg="Procesando" />
    </View>
  );
};
