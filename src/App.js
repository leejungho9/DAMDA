import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav";
import Banner from "./components/Mainbanner";
import BestSeller from "./components/Bestseller";
import Promotion from "./components/Promotion";

function App() {
  return (
    <>
      <Nav />
      <Banner />
      <BestSeller />
      <Promotion />
    </>
  );
}

export default App;
