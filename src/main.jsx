import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Tostfy
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
// Routers
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
// State Mangemant
import { RecoilRoot } from "recoil";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import "react-alice-carousel/lib/alice-carousel.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <RecoilRoot>
        <Navbar />
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);
