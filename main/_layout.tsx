import { StatusBar, View } from "react-native";
import { SpinerProcesando } from "../ui/SpinerProcesando";
import { useTheme } from "../hooks/useTheme";
import DrawerNav from "./nav/Drawer";

export const Main = () => {
  return <View style={{ flex: 1 }}>{<DrawerNav />}</View>;
};
