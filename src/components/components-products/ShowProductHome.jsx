import React from "react";
import USDollar from "./FormatPrice";

function ShowProductHome({ imgUrl, price, title }) {
  return (
    <>
      <img className={`w-full rounded-sm`} src={imgUrl} alt={title} />
      <div className={`flex flex-col gap-1 mt-2`}>
        <span className={`text-[#1C1C1C] text-base font-medium `}>
          {USDollar.format(price)}
        </span>
        <p className={`text-[#8B96A5] text-base font-normal`}>
          {title.length > 20 ? title.slice(0, 10)+'...' : title}
        </p>
      </div>
    </>
  );
}

export default ShowProductHome;
