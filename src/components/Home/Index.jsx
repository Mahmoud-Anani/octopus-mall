import React from "react";
import MainHome from "./MainHome";
import Discounts from "./Discounts";
import ViewByCategoryIndex from "../ViewByCategory/Indxe";
import Suppliers from "./Suppliers";
import RecommendedItems from "./RecommendedItems";
import Services from "./Services";
import SuppliersRegion from "./SuppliersRegion";
import Copyright from "../Copyright";
import Footer from "../layout/Footer";

// Needs
// ========================================= \\
// you need create req sned on this req category view in home
// and add category id and image cover
// /api/v1/viewCategory
// ========================================= \\

import Brands from "../components-brand/Brands";

function HomeIndex() {
  return (
    <div className="bg-[#DEE2E7] flex flex-col gap-5">
      <MainHome />
      {/* Brand */}
      <div className="hidden lg:block">
        <Brands />
      </div>
      <Discounts />
      <ViewByCategoryIndex category_id="64bf9a461e435a618d06fb61" />
      <ViewByCategoryIndex category_id="64bf9a5e1e435a618d06fb6b" />
      <Suppliers />
      <RecommendedItems />
      <Services />
      <SuppliersRegion />
      <Footer />
      <Copyright />
    </div>
  );
}

export default HomeIndex;
