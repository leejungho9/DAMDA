import { createSlice } from "@reduxjs/toolkit";
import {
  push,
  query,
  ref,
  remove,
  set,
  get,
  equalTo,
  orderByChild,
  update,
} from "firebase/database";
import { db } from "../Firebase";

//! 장바구니에 대한 상태와 관련된 액션과 리듀서 정의
const cartSlice = createSlice({
  name: "cartItem",
  initialState: [],
  reducers: {
    setCartItem: (state, action) => {
      return action.payload;
    },
    addCartItem: (state, action) => {
      const { data, userId } = action.payload;
      const cartItemsRef = ref(db, "cart_items/" + userId);
      const newCartRef = push(cartItemsRef);
      set(newCartRef, data);
    },
    plusQuantity: (state, action) => {
      const { pid, userId } = action.payload;
      // ! 장바구니 안에서 같은 pid 의 quantity 값 + 1
      const items = state.find((item) => item.pid === pid);
      if (items) {
        items.quantity += 1;
        // ! db 안에 pid 값 비교
        const cartItemsRef = ref(db, "cart_items/" + userId);
        const queryRef = query(cartItemsRef, orderByChild("pid"), equalTo(pid));

        get(queryRef).then((snapshot) => {
          const cartItem = snapshot.val();
          const key = Object.keys(cartItem);
          if (cartItem) {
            const ItemRef = ref(db, `cart_items/${userId}/${key}`);
            update(ItemRef, { quantity: cartItem[key].quantity + 1 });
          }
        });
      }
    },
    minusQuantity: (state, action) => {
      const { pid, userId } = action.payload;
      // ! 장바구니 안에서 같은 pid 의 quantity 값 - 1
      const items = state.find((item) => item.pid === pid);
      if (items) {
        items.quantity -= 1;
        // ! db 안에 pid 값 비교
        const cartItemsRef = ref(db, "cart_items/" + userId);
        const queryRef = query(cartItemsRef, orderByChild("pid"), equalTo(pid));

        get(queryRef).then((snapshot) => {
          const cartItem = snapshot.val();
          const key = Object.keys(cartItem);
          if (cartItem) {
            const ItemRef = ref(db, `cart_items/${userId}/${key}`);
            update(ItemRef, { quantity: cartItem[key].quantity - 1 });
          }
        });
      }
    },
    removeCartItem: (state, action) => {
      const { pid, userId } = action.payload;
      const cartItemsRef = ref(db, "cart_items/" + userId);
      const queryRef = query(cartItemsRef, orderByChild("pid"), equalTo(pid));

      get(queryRef).then((snapshot) => {
        const cartItem = snapshot.val();
        const key = Object.keys(cartItem);
        if (cartItem) {
          const ItemRef = ref(db, `cart_items/${userId}/${key}`);
          remove(ItemRef);
        }
      });

      return state.filter((item) => item.pid !== pid);
    },
    removeMultipleCartItems: (state, action) => {
      const { checkItems, userId } = action.payload;

      checkItems.forEach((pid) => {
        const cartItemsRef = ref(db, "cart_items/" + userId);
        const queryRef = query(cartItemsRef, orderByChild("pid"), equalTo(pid));

        get(queryRef).then((snapshot) => {
          const cartItems = snapshot.val();
          if (cartItems) {
            Object.keys(cartItems).forEach((key) => {
              const itemRef = ref(db, `cart_items/${userId}/${key}`);
              remove(itemRef);
            });
          }
        });
      });

      return state.filter((item) => !checkItems.includes(item.pid));
    },
  },
});

export const {
  setCartItem,
  addCartItem,
  plusQuantity,
  minusQuantity,
  removeCartItem,
  removeMultipleCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
