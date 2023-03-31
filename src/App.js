import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home.component";
import Navigation from "./pages/navigation/navigation.component";

function Shop() {
  return <h1>I'm the shop</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
