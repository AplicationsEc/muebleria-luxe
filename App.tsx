import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Main } from "./main/Nav";
import { useSpinnerPro } from "./store/useSpinnerPro";
import { SpinerProcesando } from "./ui/SpinnerProcesando";
import { s } from "./helper/responsive";
export default function App() {
  const procesando = useSpinnerPro((state) => state.procesando);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Main />
      {procesando && <SpinerProcesando />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: s(40),
  },
});
