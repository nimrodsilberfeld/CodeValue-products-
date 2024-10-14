import { useEffect } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import mockProducts from "./data/mockData";
import { AppDispatch } from "./redux/store";
import { useDispatch } from "react-redux";
import { setProducts } from "./redux/productsSlice";
import { Product } from "./models/Product";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const localProducts = localStorage.getItem("products");
    if (localProducts === null || localProducts === "[]") {
      console.log("Setting products to local storage");
      localStorage.setItem("products", JSON.stringify(mockProducts));
      const productsByType = mockProducts.map((product) => {
        return new Product(
          product.name,
          product.description,
          product.price,
          new Date(product.creationDate)
        );
      });
      dispatch(setProducts(productsByType));
    }
  }, []);
  return (
    <div className="app-conatiner">
      <Header />
      <Router>
        <Routes>
          {/* Redirect root ("/") to "/products" */}
          <Route path="/" element={<Navigate to="/products" replace />} />

          {/* Route for HomePage, handling optional :id */}
          <Route path="/products/:id?" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
