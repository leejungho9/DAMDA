import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "./reducers/userSlice";
import { getUser } from "./apis/apis";
import Nav from "./components/Common/Nav";
import Footer from "./components/Common/Footer";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import ShopDetail from "./pages/ShopDetail";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import ScrollToTop from "./hooks/ScrollToTop";
import Signup from "./pages/Signup";
import Wish from "./pages/Wish";
import Promotion from "./pages/Promotion";
import Brand from "./pages/Brand";

function App() {
  const dispatch = useDispatch();
  //! 현재 로그인 유저 확인
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userId = user.uid;
          const userInfo = await getUser(userId);
          dispatch(login({ isLoggedIn: true, user: userInfo }));
        }
      } catch (error) {
        console.error(error);
      }
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Route path="/promotion" element={<Promotion />}></Route>
          <Route path="/brand" element={<Brand />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
