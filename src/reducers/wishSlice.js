import { createSlice } from "@reduxjs/toolkit";
import { db } from "../Firebase";
import { push, ref } from "firebase/database";

//! 관심상품에 대한 상태와 관련된 액션과 리듀서 정의
const wishSlice = createSlice({
  name: "wishItem",
  initialState: [],
  reducers: {
    setWishItem: (state, action) => {
      return action.payload;
    },
    addWishItem: (state, action) => {
      const { data, userId } = action.payload;
      const wishItemRef = ref(db, "wish_items/" + userId);
      push(wishItemRef, data);
      // set(newWishRef, data);
    },
  },
});

export const { setWishItem, addWishItem } = wishSlice.actions;

export default wishSlice.reducer;
