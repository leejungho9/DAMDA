import { createSlice } from "@reduxjs/toolkit";
import { getCartItem } from "../apis/apis";
import { useDispatch } from "react-redux";

// initialState 초기값 db에서 받아오기

// const initialState = [];

// const fetchCartItems = async (dispatch) => {
//   try {
//     const cartItems = await getCartItem();
//     initialState.push(cartItems);

//     // 가져온 데이터를 초기값으로 설정
//   } catch (error) {
//     console.error(error);
//   }
// };

//장바구니에 대한 상태와 관련된 액션과 리듀서 정의
let cartSlice = createSlice({
  name: "cartItem",
  initialState: [],
  reducers: {
    // plusQuantity: (state, action) => {
    //   const { pid, quantity } = action.payload;
    //   const item = state.find((item) => item.pid === id);
    //   if (item) {
    //     item.quantity += quantity;
    //   }
    // },
  },
});

export let { addCart } = cartSlice.actions;

export default cartSlice.reducer;
// export { fetchCartItems };
