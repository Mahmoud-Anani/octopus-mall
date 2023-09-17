import React from 'react'
// Router
import { Link } from 'react-router-dom';



function DiscountOf100() {
  return (
    <div
      className={`px-10 py-7 rounded-lg bg-gradient-to-r from-[#237CFF] to-[#005ADE] mt-5 flex justify-between`}
    >
      <p className={`text-[#FFF] text-2xl font-semibold`}>
        Super discount on more than 100 USD
      </p>
      <Link to={`/products`} className={`bg-[#FF9017] px-3 py-2 rounded-lg`}>
        <span className={` text-base font-medium text-[#FFF]`}>Shop now</span>
      </Link>
    </div>
  );
}

export default DiscountOf100