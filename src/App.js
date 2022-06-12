import "./App.css";
import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "./GraphQL/Queries";
import ProductDetails from "./components/Products/ProductDetails";
import CartPage from "./components/CartPage/CartPage";

function App() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) console.log(error);

  const productRoutes = data.categories.map((item) => {
    return (
      <Route
        key={item.name}
        path={"/products/" + item.name}
        element={<Products category={item.name} />}
      />
    );
  });

  return (
    <Router>
      <Fragment>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/products/all" />} />
          {productRoutes}
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
