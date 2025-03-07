import { StyleSheet } from "react-native";

export const lightSty = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 16,
    color: "#000000",
  },
});

export const darkSty = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#000000",
  },
  text: {
    fontSize: 16,
    color: "#ffffff",
  },
});

export const sty = {
  light: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  dark: {
    flex: 1,
    padding: 16,
    backgroundColor: "#000000",
    color: "#ffffff",
  },
};
