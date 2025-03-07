import { StatusBar, View } from "react-native";
import { SpinerProcesando } from "../ui/SpinerProcesando";
import { useTheme } from "../hooks/useTheme";

export const RootApp = () => {
  const { theme, toggleTheme, colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
      <SpinerProcesando msg="Procesando" />
      <StatusBar backgroundColor={colors.background} barStyle="light-content" />
    </View>
  );
};
