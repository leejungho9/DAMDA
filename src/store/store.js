import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../reducers/cartSlice";

const store = configureStore({
  reducer: {
    cartItems: cartReducer,
  },
});
export default store;
