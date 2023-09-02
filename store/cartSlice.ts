// @ts-nocheck
import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  deliveryFee: 15,
  freeDeliveryFrom: 200,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const newProduct = action.payload.product;
      const CartItem = state.items.find(
        (item) => item.product._id === newProduct._id
      );

      if (CartItem) {
        CartItem.quantity += 1;
      } else {
        //@ts-ignore
        state.items.push({
          product: newProduct,
          quantity: 1,
        });
      }
    },
    changeQuantity: (state, action) => {
      const { productId, amount } = action.payload;
      const cartItem = state.items.find(
        (item) => item.product._id === productId
      );

      if (cartItem) {
        cartItem.quantity += amount;
      }

      if (cartItem.quantity <= 0) {
        state.items = state.items.reduce((item) => item !== cartItem);
      }
    },
    clear: (state) => (state.items = []),
  },
});

export const selectNumberOfItems = (state) => state.cart.items.length;

export const selectSubtotal = (state) =>
  state.cart?.items.reduce(
    (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
    0
  );

const cartSelector = (state) => state.cart;

export const selectDeliveryPrice = createSelector(
  cartSelector,
  selectSubtotal,
  (cart, subtotal) => (subtotal > cart.freeDeliveryFrom ? 0 : cart.deliveryFee)
);
