import { createSlice } from "@reduxjs/toolkit";
// ! 로그인 한 유저에 대한 상태와 관련된 액션과 리듀서 정의

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    user: {},
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = {};
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
