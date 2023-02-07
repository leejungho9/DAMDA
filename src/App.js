import "./App.css";
import Nav from "./components/Nav";
import Banner from "./components/Mainbanner";
import BestSeller from "./components/Bestseller";
import Promotion from "./components/Promotion";
import Advertisement from "./components/Advertisement";
import Brand from "./components/Brand";
import BestReview from "./components/Bestreview";

function App() {
  return (
    <>
      <Nav />
      <Banner />
      <BestSeller />
      <Advertisement/>
      <Promotion />
      <BestReview />
      <Brand/>
    </>
  );
}

export default App;
