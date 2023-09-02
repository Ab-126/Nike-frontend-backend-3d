import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
// import products from "../assets/data/products";
import { Link, useNavigation } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { productsSlice } from "../store/prodouctSlice";
import { useGetProductsQuery } from "../store/apiSlice";

const ProductScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const products = useSelector((state: any) => state.products.products);

  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching products: {error.error}</Text>;
  }

  const products = data.data;

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Link href={`/products/${item._id}`} asChild>
            <Pressable
              style={styles.itemContainer}
              onPress={() => {
                // dispatch(productsSlice.actions.setSelectedProduct(item._id));
              }}
            >
              <Image
                source={{
                  uri: item.image,
                }}
                style={styles.image}
              />
              <Text style={styles.title}>{item.name}</Text>
            </Pressable>
          </Link>
        )}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    margin: 3,
    width: "50%",
    padding: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 18,
  },
});
