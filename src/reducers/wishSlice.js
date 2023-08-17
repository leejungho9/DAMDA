import { createSlice } from "@reduxjs/toolkit";
import { db } from "../Firebase";
import {
  equalTo,
  get,
  orderByChild,
  push,
  query,
  ref,
  remove,
} from "firebase/database";

//! 관심상품에 대한 상태와 관련된 액션과 리듀서 정의
const wishSlice = createSlice({
  name: "wishItem",
  initialState: [],
  reducers: {
    setWishItem: (_, action) => action.payload,
    addWishItem: (_, action) => {
      const { data, userId } = action.payload;
      addCartWishItemInFirebase(userId, data);
    },
    removeWishItem: (state, action) => {
      const { checkItemId, userId } = action.payload;
      removeWishItemInFirebase(userId, checkItemId);
      return state.filter((pid) => !checkItemId.includes(pid));
    },
  },
});

export const { setWishItem, addWishItem, removeWishItem } = wishSlice.actions;

export default wishSlice.reducer;

//! firebase 코드 분리

const addCartWishItemInFirebase = async (userId, data) => {
  const wishItemRef = ref(db, `wish_items/${userId}`);
  push(wishItemRef, data);
};

const removeWishItemInFirebase = async (userId, checkItemId) => {
  const wishItemRef = ref(db, `wish_items/${userId}`);
  checkItemId.forEach((pid) => {
    const queryRef = query(wishItemRef, orderByChild("pid"), equalTo(pid));
    get(queryRef).then((snapshot) => {
      const wishItem = snapshot.val();
      const key = Object.keys(wishItem);
      if (wishItem) {
        const wishRef = ref(db, `wish_items/${userId}/${key}`);
        remove(wishRef);
      }
    });
  });
};
