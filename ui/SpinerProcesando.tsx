import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
interface PropsSpinerProcesando {
  msg: string;
}
export const SpinerProcesando: React.FC<PropsSpinerProcesando> = ({ msg }) => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={"blue"} />
      <Text>{msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Fondo semitransparente
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});
