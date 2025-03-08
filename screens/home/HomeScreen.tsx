import { StyleSheet, Text, View } from "react-native";
import { GRIS_CLARO, GRIS_CLARO_2, GRIS_OSCURO } from "../../constants/Colors";

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>TestXA</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRIS_CLARO_2,
  },
  text: {
    color: GRIS_OSCURO,
    fontSize: 24,
  },
});
