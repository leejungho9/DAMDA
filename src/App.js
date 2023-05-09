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

function App() {
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
