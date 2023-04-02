import { Route, Routes } from "react-router-dom";
import Checkout from "./pages/checkout/checkout.component";
import Home from "./pages/home/home.component";
import Navigation from "./pages/navigation/navigation.component";
import Shop from "./pages/shop/shop.component";
import SignIn from "./pages/sign-in/sign-in.component";
import SignUp from "./pages/sign-up/sign-up.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />}></Route>
        <Route path="checkout" element={<Checkout />}></Route>
        <Route path="sign-in" element={<SignIn />}></Route>
        <Route path="sign-up" element={<SignUp />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
