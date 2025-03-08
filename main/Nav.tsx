import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
export const Main = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen } from "../screens/home/HomeScreen";
import { SettingsScreen } from "../screens/settings/SettingsScreen";

const Drawer = createDrawerNavigator();
