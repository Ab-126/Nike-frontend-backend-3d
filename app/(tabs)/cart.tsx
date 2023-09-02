import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import CartListItem from "../../components/CartListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDeliveryPrice,
  selectSubtotal,
  cartSlice,
} from "../../store/cartSlice";
import { useCreateOrderMutation } from "../../store/apiSlice";

export default function ShoppingCart() {
  const cartItems = useSelector((state: any) => state.cart.items);
  const subTotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const dispatch = useDispatch();

  if (cartItems === undefined) {
    return <Text>No items in the cart</Text>;
  }

  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();

  console.log(error, isLoading);

  const onCreateOrder = () => {
    const result = createOrder({
      items: cartItems,
      subtotal: subTotal,
      delivery: deliveryFee,
      total: subTotal + deliveryFee,
      customer: {
        name: "Abhishek",
        address: "A house",
        email: "abhishek@gmail.com",
      },
    });

    if (result.data?.status === "OK") {
      Alert.alert(
        "Order has been submitted",
        `Your order reference is: ${result.data.data.ref}`
      );
      dispatch(cartSlice.actions.clear());
    }
  };

  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={styles.container}
        ListFooterComponent={() => (
          <View style={styles.totalsContainer}>
            <View style={styles.row}>
              <Text style={styles.text}>Subtotal</Text>
              <Text style={styles.text}>{subTotal} US$</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Delivery</Text>
              <Text style={styles.text}>{deliveryFee} US$</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.textBold}>Total</Text>
              <Text style={styles.textBold}>{subTotal + deliveryFee} US$</Text>
            </View>
          </View>
        )}
      />
      <Pressable onPress={onCreateOrder} style={styles.button}>
        <Text style={styles.buttonText}>
          Checkout {isLoading && <ActivityIndicator />}
        </Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: "gainsboro",
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textBold: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
