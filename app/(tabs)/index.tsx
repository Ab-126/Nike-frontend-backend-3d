import { StyleSheet, Image, FlatList } from "react-native";
import { View } from "../../components/Themed";
import ProductScreen from "../../components/ProductScreen";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <ProductScreen />
      {/* <ProductListScreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
