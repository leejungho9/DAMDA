import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav";
import Banner from "./components/Mainbanner";
import BestSeller from "./components/Bestseller";
import Promotion from "./components/Promotion";
import Advertisement from "./components/Advertisement";

function App() {
  return (
    <>
      <Nav />
      <Banner />
      <BestSeller />
      <Advertisement/>
      <Promotion />
    </>
  );
}

export default App;
