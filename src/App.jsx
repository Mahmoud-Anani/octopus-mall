import React from "react";
import "./App.css";
// Routers
import { Routes, Route, Link } from "react-router-dom";
import SignIn from "./components/auth/signin";
import SignUp from "./components/auth/Signup";
import ForgotPassword from "./components/auth/Forgot-Password/ForgotPassword";
import ResetPassword from "./components/auth/Forgot-Password/ResetPassword";
import VerifyCodePassword from "./components/auth/Forgot-Password/VerifyCodePassword";
import { useRecoilState } from "recoil";
import {
  products,
  storeCategorys,
  loadingState,
} from "./store/ViewProductHome";
import HomeIndex from "./components/Home/Index";
import ProductsIndex from "./components/Products/ProductsIndex";
import { filterCategory } from "./store/FiltersStore";
import SingleProducts from "./components/Single-products/SingleProducts";
import CartItems from "./components/cart/CartItems";
import Profile from "./components/profile/Profile";
import Orders from "./components/orders/Orders";
import Footer from "./components/layout/Footer";
import Category from "./components/Categorys/Category";
import SingleCategory from "./components/Categorys/SingleCategory";

function App() {
  const [filterCategoryState] = useRecoilState(filterCategory);
  // console.log(filterCategoryState);

  const [loading, setloading] = useRecoilState(loadingState);
  const [categorys] = useRecoilState(storeCategorys);
  const [prducts] = useRecoilState(products);
  React.useEffect(() => {
    if (categorys.length > 0 && prducts.length > 0) {
      setloading(false);
    }
  }, [prducts, categorys]);

  if (loading) {
    return (
      <div
        className={`h-[100vh] flex justify-center items-center bg-slate-800`}
      >
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <Routes>
      <Route path="*" element={<>404</>} />
      <Route path="/" element={<HomeIndex />} />
      {/* Auth */}
      <Route
        path="/auth/sign-in"
        element={
          <>
            <SignIn />
          </>
        }
      />
      <Route
        path="/auth/sign-up"
        element={
          <>
            <SignUp />
          </>
        }
      />
      <Route
        path="/auth/forgot-password"
        element={
          <>
            <ForgotPassword />
          </>
        }
      />
      <Route
        path="/auth/forgot-password/verify-code"
        element={
          <>
            <VerifyCodePassword />
          </>
        }
      />
      <Route
        path="/auth/forgot-password/reset-password"
        element={
          <>
            <ResetPassword />
          </>
        }
      />
      {/* Products */}
      <Route
        path="/products"
        element={
          <div className="bg-[#DEE2E7]">
            <ProductsIndex />
          </div>
        }
      />
      {/* single product */}
      <Route
        path="/products/:productSlug"
        element={
          <div className="bg-[#DEE2E7]">
            <SingleProducts />
          </div>
        }
      />
      {/* Cart */}
      <Route
        path="/cart"
        element={
          <div className="bg-[#F7FAFC]">
            <CartItems />
          </div>
        }
      />
      {/* Profile */}
      <Route
        path="/protofil"
        element={
          <div className="bg-[#F7FAFC]">
            <Profile />
          </div>
        }
      />
      {/* Orders */}
      <Route
        path="/orders"
        element={
          <div className="bg-[#F7FAFC]">
            <Orders />
          </div>
        }
      />
      {/* About */}
      <Route
        path="/about"
        element={
          <>
            <iframe
              src="https://mahmoud-abdullah-anani.vercel.app/"
              className={`w-full h-[100vh]`}
            ></iframe>
            <Footer />
          </>
        }
      />
      {/* Categories */}
      <Route
        path="/categories"
        element={
          <div className="bg-[#F7FAFC]">
            <Category />
          </div>
        }
      />
      {/* Category */}
      <Route
        path="/categories/:category"
        element={
          <div className="bg-[#F7FAFC]">
            <SingleCategory />
          </div>
        }
      />
      {/* Favorites */}
      <Route
        path="/favorites"
        element={
          <div className="bg-[#F7FAFC]">
            Welcome to your whish list
          </div>
        }
      />
    </Routes>
  );
}

export default App;
