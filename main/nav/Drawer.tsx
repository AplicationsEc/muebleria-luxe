import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "../../screens/home/HomeScreen";
import { UserSettings } from "../../screens/settings/UserSettings";
const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={UserSettings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
