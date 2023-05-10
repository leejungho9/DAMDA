import { createSlice } from "@reduxjs/toolkit";
import { push, query, ref, remove, set, get } from "firebase/database";
import { db } from "../Firebase";

//장바구니에 대한 상태와 관련된 액션과 리듀서 정의
const cartSlice = createSlice({
  name: "cartItem",
  initialState: [],
  reducers: {
    setCartItem: (state, action) => {
      return action.payload;
    },
    addCartItem: (state, action) => {
      const newCartItem = action.payload;
      const cartItemsRef = ref(db, "cart_items/U01");
      const newCartRef = push(cartItemsRef);
      set(newCartRef, newCartItem);
    },
    plusQuantity: (state, action) => {
      const { pid } = action.payload;
      const item = state.find((item) => item.pid === pid);
      if (item) {
        item.quantity += 1;
        const cartItemsRef = ref(db, "cart_items/U01");
        const cartItemsQuery = query(cartItemsRef);

        get(cartItemsQuery).then((snapshot) => {
          const cartItems = snapshot.val();

          for (const key in cartItems) {
            if (cartItems[key].pid === pid) {
              const cartItemRef = ref(db, `cart_items/U01/${key}`);
              const newQuantity = cartItems[key].quantity + 1;
              set(cartItemRef, { ...cartItems[key], quantity: newQuantity });
              break;
            }
          }
        });
      }
    },
    minusQuantity: (state, action) => {
      const { pid } = action.payload;
      const item = state.find((item) => item.pid === pid);
      if (item) {
        item.quantity -= 1;
        const cartItemsRef = ref(db, "cart_items/U01");
        const cartItemsQuery = query(cartItemsRef);

        get(cartItemsQuery).then((snapshot) => {
          const cartItems = snapshot.val();

          for (const key in cartItems) {
            if (cartItems[key].pid === pid) {
              const cartItemRef = ref(db, `cart_items/U01/${key}`);
              const newQuantity = cartItems[key].quantity - 1;
              set(cartItemRef, { ...cartItems[key], quantity: newQuantity });
              break;
            }
          }
        });
      }
    },
    removeCartItem: (state, action) => {
      const pid = action.payload;
      const cartItemsRef = ref(db, "cart_items/U01");
      const cartItemsQuery = query(cartItemsRef);

      get(cartItemsQuery).then((snapshot) => {
        const cartItems = snapshot.val();
        console.log(cartItems);
        for (const key in cartItems) {
          console.log(cartItems[key].pid);
          console.log(cartItems[key].pid === pid);
          if (cartItems[key].pid === pid) {
            const cartItemRef = ref(db, `cart_items/U01/${key}`);
            remove(cartItemRef);
            break;
          }
        }
      });

      return state.filter((item) => item.pid !== pid);
    },
  },
});

export const {
  setCartItem,
  addCartItem,
  plusQuantity,
  minusQuantity,
  removeCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
