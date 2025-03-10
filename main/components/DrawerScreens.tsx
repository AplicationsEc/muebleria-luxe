// Asegúrate de importar el Drawer correcto
import { HomeScreen } from "../../screens/home/HomeScreen";
import { SettingsScreen } from "../../screens/settings/SettingsScreen";
import { Drawer } from "../DrawerNavigator";

export const DrawerScreens = () => {
  return (
    <Drawer.Group>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={SettingsScreen} />
    </Drawer.Group>
  );
};
