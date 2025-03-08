import { StatusBar, View } from "react-native";
import { Main } from "./main/_layout";
import { SpinerProcesando } from "./ui/SpinerProcesando";
import { useTheme } from "./hooks/useTheme";

export const RootLayoutApp = () => {
  const { theme, toggleTheme, colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <SpinerProcesando msg="Procesando" />
      <Main />
    </View>
  );
};
