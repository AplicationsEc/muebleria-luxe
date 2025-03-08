// Theme.ts
import { DefaultTheme, MD3Theme } from "react-native-paper";
import { configureFonts } from "react-native-paper";

const fontConfig = {
  fontFamily: "Poppins",
};

const theme: MD3Theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(76, 87, 169)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(223, 224, 255)",
    onPrimaryContainer: "rgb(0, 11, 98)",
    secondary: "rgb(0, 103, 127)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(183, 234, 255)",
    onSecondaryContainer: "rgb(0, 31, 40)",
    tertiary: "rgb(0, 104, 116)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(151, 240, 255)",
    onTertiaryContainer: "rgb(0, 31, 36)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(27, 27, 31)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(27, 27, 31)",
    surfaceVariant: "rgb(227, 225, 236)",
    onSurfaceVariant: "rgb(70, 70, 79)",
    outline: "rgb(119, 118, 128)",
    outlineVariant: "rgb(199, 197, 208)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(48, 48, 52)",
    inverseOnSurface: "rgb(243, 240, 244)",
    inversePrimary: "rgb(188, 194, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(246, 243, 251)",
      level2: "rgb(241, 238, 248)",
      level3: "rgb(235, 233, 246)",
      level4: "rgb(234, 231, 245)",
      level5: "rgb(230, 228, 243)",
    },
    surfaceDisabled: "rgba(27, 27, 31, 0.12)",
    onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
    backdrop: "rgba(47, 48, 56, 0.4)",
    azul: "#020D5E",
  },
};

export default theme;
