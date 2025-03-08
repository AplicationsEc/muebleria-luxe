import { ActivityIndicator, StyleSheet, View } from "react-native";

export const SpinerProcesando = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={"blue"} />
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
