import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./components/Nav";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Shop from "./pages/Shop";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
