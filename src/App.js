import "./App.css";
import Nav from "./components/Nav";
import Banner from "./components/Mainbanner";
import BestSeller from "./components/Bestseller";
import Promotion from "./components/Promotion";
import Advertisement from "./components/Advertisement";
import Carousel from "./components/Carousel";
import Brand from "./components/Brand";

function App() {
  return (
    <>
      <Nav />
      <Banner />
      <BestSeller />
      <Carousel/>
      <Advertisement/>
      <Promotion />
      <Brand/>
    </>
  );
}

export default App;
