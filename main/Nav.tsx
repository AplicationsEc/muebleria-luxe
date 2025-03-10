import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Image, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GRIS_CLARO_2, NEGRO } from "../constants/Colors";
import { DrawerScreens } from "./components/DrawerScreens";
import { Drawer } from "./DrawerNavigator";

// ✅ Usa DrawerContentComponentProps para definir correctamente los props
const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* 🔹 Logo o Icono encima de los DrawerItem */}
      <View style={{ alignItems: "center", paddingVertical: 20 }}>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 100, height: 100 }}
        />
      </View>
      {/* 🔹 Renderiza los DrawerItem debajo */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export const Main = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerTitleStyle: {
            fontSize: 14,
          },
          headerStyle: {
            backgroundColor: NEGRO,

            opacity: 0.9,
          },
          headerTintColor: "#fff",
          drawerContentStyle: {
            backgroundColor: GRIS_CLARO_2,
          },
        }}
      >
        {DrawerScreens()}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
