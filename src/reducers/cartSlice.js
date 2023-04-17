import { createSlice } from "@reduxjs/toolkit";
import { getCartItem } from "../apis/apis";

//장바구니에 대한 상태와 관련된 액션과 리듀서 정의
let cartSlice = createSlice({
  name: "cartItem",
  initialState: [],
  reducers: {
    setItems: (state, action) => {
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

export const fetchCartItems = () => async (dispatch) => {
  try {
    const cartItems = await getCartItem();
    dispatch(cartSlice.actions.setItems(cartItems));
  } catch (error) {
    console.error(error);
  }
};

export const { plusQuantity, minusQuantity } = cartSlice.actions;

export default cartSlice.reducer;
