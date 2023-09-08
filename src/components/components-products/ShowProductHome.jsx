import React from "react";
import {EGP} from "./FormatPrice";
import { Rating } from "@mui/material";

function ShowProductHome({ imgUrl, price, title ,ratingsAverage}) {
  return (
    <>
      <img className={`w-full rounded-sm`} src={imgUrl} alt={title} />
      <div className={`flex flex-col gap-1 mt-2`}>
        <span className={`text-[#1C1C1C] text-base font-medium `}>
          {EGP.format(price)}
        </span>
        <p className={`text-[#8B96A5] text-base font-normal`}>
          {title.length > 20 ? title.slice(0, 10) + "..." : title}
        </p>
        <Rating name="read-only" value={ratingsAverage} readOnly />
      </div>
    </>
  );
}

export default ShowProductHome;
