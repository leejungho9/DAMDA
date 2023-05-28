import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Footer from "./components/Footer";
import ShopDetail from "./pages/ShopDetail";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import ScrollToTop from "./hooks/ScrollToTop";
import Signup from "./pages/Signup";
import Wish from "./pages/Wish";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUser } from "./apis/apis";
import { useDispatch } from "react-redux";
import { login } from "./reducers/userSlice";

function App() {
  // ! 현재 로그인한 사용자 정보 가져오기 (혹시 모르니 남겨두기)
  const dispatch = useDispatch();
  useEffect(() => {
    const CheckLoginUserInfo = async () => {
      const auth = getAuth();

      const getLoggedInUserId = new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            resolve(user.uid);
          } else {
            reject(null);
          }
        });
      });
      if (getLoggedInUserId) {
        const userId = await getLoggedInUserId;
        const userInfo = await getUser(userId);
        dispatch(login({ isLoggedIn: true, user: userInfo }));
        return userInfo;
      } else {
        return undefined;
      }
    };
    CheckLoginUserInfo();
  }, []);
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/wish" element={<Wish />}></Route>
          <Route path="/orders" element={<Order />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/shop/:id" element={<ShopDetail />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
