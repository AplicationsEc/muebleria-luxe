import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen } from "../screens/home/HomeScreen";
import { SettingsScreen } from "../screens/settings/SettingsScreen";
import { AZUL, GRIS, GRIS_OSCURO, NEGRO } from "../constants/Colors";
import { NavigationContainer } from "@react-navigation/native";
export const Main = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontSize: 14,
          },
          headerStyle: {
            backgroundColor: NEGRO,
            opacity: 0.9,
            maxHeight: 70,
          },
          headerTintColor: "#fff",
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const Drawer = createDrawerNavigator();
