import Navbar from './components/navbar';
import Home from "./pages/home";
import Details from "./pages/details";
import Cart from "./pages/cart";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;