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
    setCartItem: (_, action) => action.payload,
    addCartItem: (_, action) => {
      const { data, userId } = action.payload;
      addCartItemInFirebase(userId, data);
    },
    removeCartItem: (state, action) => {
      const { pid, userId } = action.payload;
      removeCartItemInFirebase(userId, pid);
      return state.filter((item) => item.pid !== pid);
    },
    removeMultipleCartItems: (state, action) => {
      const { checkItems, userId } = action.payload;
      removeMultipleCartItemsInFirebase(userId, checkItems);
      return state.filter((item) => !checkItems.includes(item.pid));
    },
    plusQuantity: (state, action) => {
      const { pid, userId } = action.payload;
      const items = state.find((item) => item.pid === pid);
      if (items) {
        items.quantity += 1;
        plusQuantityInFirebase(userId, pid);
      }
    },
    minusQuantity: (state, action) => {
      const { pid, userId } = action.payload;
      const items = state.find((item) => item.pid === pid);
      if (items) {
        items.quantity -= 1;
        minusQuantityInFirebase(userId, pid);
      }
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

//! firebase 코드 분리

const addCartItemInFirebase = async (userId, data) => {
  const cartItemsRef = ref(db, `cart_items/${userId}`);
  const newCartRef = push(cartItemsRef);
  set(newCartRef, data);
};

const removeCartItemInFirebase = async (userId, pid) => {
  const cartItemsRef = ref(db, `cart_items/${userId}`);
  const queryRef = query(cartItemsRef, orderByChild("pid"), equalTo(pid));
  get(queryRef).then((snapshot) => {
    const cartItem = snapshot.val();
    if (cartItem) {
      const key = Object.keys(cartItem);
      const ItemRef = ref(db, `cart_items/${userId}/${key}`);
      remove(ItemRef);
    }
  });
};

const removeMultipleCartItemsInFirebase = async (userId, checkItems) => {
  const cartItemsRef = ref(db, `cart_items/${userId}`);
  checkItems.forEach((pid) => {
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
};

const plusQuantityInFirebase = async (userId, pid) => {
  const cartItemsRef = ref(db, `cart_items/${userId}`);
  const queryRef = query(cartItemsRef, orderByChild("pid"), equalTo(pid));

  get(queryRef).then((snapshot) => {
    const cartItem = snapshot.val();
    const key = Object.keys(cartItem);
    if (cartItem) {
      const ItemRef = ref(db, `cart_items/${userId}/${key}`);
      update(ItemRef, { quantity: cartItem[key].quantity + 1 });
    }
  });
};

const minusQuantityInFirebase = async (userId, pid) => {
  const cartItemsRef = ref(db, `cart_items/${userId}`);
  const queryRef = query(cartItemsRef, orderByChild("pid"), equalTo(pid));

  get(queryRef).then((snapshot) => {
    const cartItem = snapshot.val();
    const key = Object.keys(cartItem);
    if (cartItem) {
      const ItemRef = ref(db, `cart_items/${userId}/${key}`);
      update(ItemRef, { quantity: cartItem[key].quantity - 1 });
    }
  });
};
