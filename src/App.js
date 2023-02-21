import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./components/Nav";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Footer from "./components/Footer";
import ShopDetail from "./pages/ShopDetail";
import { useEffect } from "react";
import { analytics } from "./Firebase";


function App() {
  useEffect(()=> {
    console.log(analytics)
  })
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/shop/:id" element={<ShopDetail />}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
