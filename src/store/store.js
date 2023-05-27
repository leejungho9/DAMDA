import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../reducers/cartSlice";
import userReducer from "../reducers/userSlice";
import wishReducer from "../reducers/wishSlice";

const store = configureStore({
  reducer: {
    cartItems: cartReducer,
    wishItems: wishReducer,
    user: userReducer,
  },
});

export default store;
