import React from 'react'
import notFoundProducts from "./../../assets/products/notFound-Products.gif";


function NotFoundProducts() {
  return (
    <div>
      <p className="text-[#000000] text-center text-lg font-medium">
        Not Found Products!
      </p>
      <img
        className={`max-w-xs mx-auto`}
        src={notFoundProducts}
        alt="not Found Products"
      />
    </div>
  );
}

export default NotFoundProducts