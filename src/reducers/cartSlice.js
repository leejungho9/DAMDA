import { createSlice } from "@reduxjs/toolkit";

//장바구니에 대한 상태와 관련된 액션과 리듀서 정의
const cartSlice = createSlice({
  name: "cartItem",
  initialState: [],
  reducers: {
    setCartItems: (state, action) => {
      return action.payload;
    },
    plusQuantity: (state, action) => {
      const { pid } = action.payload;
      const item = state.find((item) => item.pid === pid);
      if (item) {
        item.quantity += 1;
      }
    },

    minusQuantity: (state, action) => {
      const { pid } = action.payload;
      const item = state.find((item) => item.pid === pid);
      if (item) {
        item.quantity -= 1;
      }
    },
  },
});

export const { setCartItems, plusQuantity, minusQuantity } = cartSlice.actions;

export default cartSlice.reducer;
