import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { useRecoilState } from "recoil";
import {
  mainProductsState,
  producsDicountsState,
  products,
} from "../../store/ViewProductHome";
import { Link } from "react-router-dom";

import notFoundProducts from "./../../assets/products/notFound-Products.gif";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

let producsDicountsAlise = [];

function Discounts() {
  // handle products
  // const [producs] = useRecoilState(products);
  const [producs] = useRecoilState(mainProductsState);
  const [producsDicounts, setProducsDicounts] =
    useRecoilState(producsDicountsState);

  // console.log(producsDicounts);

  // handle time
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    if (producs.length > 0) {
      const proDis = producs.filter(
        ({ priceAfterDiscount = 0 }) => priceAfterDiscount > 0
      );
      producsDicountsAlise = proDis;
      setProducsDicounts(proDis);
    }
  }, [producs]);

  React.useLayoutEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
  }, []);
  const month = String(currentTime.getMonth() + 1).padStart(2, "0");
  const day = String(currentTime.getDate()).padStart(2, "0");
  let hours = String(currentTime.getHours() % 12);
  if (hours === "0") {
    hours = "12";
  }
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");
  const seconds = String(currentTime.getSeconds()).padStart(2, "0");

  const ampm = currentTime.getHours() >= 12 ? "PM" : "AM";

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={"section"} maxWidth={"xl"}>
        <CssBaseline />
        <div
          className={`flex lg:flex-row flex-col gap-2 justify-between items-between  rounded-lg bg-[#fff] border-4 border-[#DEE2E7] p-4 mt-2 border-1`}
        >
          {/* Handle Time */}
          <div className="w-[20%]">
            <div className={`bottom-1 flex  h-fit  flex-col gap-3 `}>
              <div className="flex flex-col ">
                <p
                  className={`font-semibold text-xl text-[#1C1C1C] whitespace-nowrap`}
                >
                  Deals and offers
                </p>
                <p
                  className={`text-[#8B96A5] text-base font-normal  whitespace-nowrap`}
                >
                  Hygiene equipments
                </p>
              </div>
              <div className={`flex gap-2`}>
                <div
                  className={`rounded-lg bg-[#606060] flex flex-col p-2 text-center`}
                >
                  <span
                    className={`text-[#FFF] text-base font-bold whitespace-nowrap`}
                  >
                    {month}/{day}
                  </span>
                  <span className={`text-[#FFF] text-xs font-normal`}>
                    Days
                  </span>
                </div>
                <div
                  className={`rounded-lg bg-[#606060] flex flex-col p-2 text-center`}
                >
                  <span
                    className={`text-[#FFF] text-base font-bold whitespace-nowrap`}
                  >
                    {hours} {ampm}
                  </span>
                  <span className={`text-[#FFF] text-xs font-normal`}>
                    Hour
                  </span>
                </div>
                <div
                  className={`rounded-lg bg-[#606060] flex flex-col p-2 text-center`}
                >
                  <span className={`text-[#FFF] text-base font-bold`}>
                    {minutes}
                  </span>
                  <span className={`text-[#FFF] text-xs font-normal`}>Min</span>
                </div>
                <div
                  className={`rounded-lg bg-[#606060] flex flex-col p-2 text-center`}
                >
                  <span className={`text-[#FFF] text-base font-bold`}>
                    {seconds}
                  </span>
                  <span className={`text-[#FFF] text-xs font-normal`}>Sec</span>
                </div>
              </div>
            </div>
          </div>
          {/* Products on the Discounts */}
          <div className="w-[70%] md:mt-0 mt-2 mx-auto ">
            <div
              className={`flex gap-4 flex-wrap justify-around  items-center`}
            >
              {producsDicountsAlise.length > 0 ? (
                producsDicountsAlise
                  .slice(0, 5)
                  .map(
                    ({ _id, imageCover, title, price, priceAfterDiscount }) => {
                      return (
                        <Link
                          to={`/product`}
                          key={_id}
                          className="text-center border-x-2 px-2  "
                        >
                          <img
                            className={`w-full sm:w-24 rounded-lg `}
                            src={imageCover}
                            alt={title}
                          />
                          <p
                            className={`text-[#1C1C1C] my-2 text-base font-normal text-center`}
                          >
                            {title.length > 30
                              ? `${title.slice(0, 10)}...`
                              : title}
                          </p>
                          <span
                            className={`text-[#EB001B] bg-[#FFE3E3] text-sm font-medium px-3 py-2 rounded-xl`}
                          >
                            -
                            {Math.round(
                              ((price - priceAfterDiscount) / price) * 100
                            )}
                            %
                          </span>
                        </Link>
                      );
                    }
                  )
              ) : (
                <div>
                  <p className="text-[#000000] text-center text-lg font-medium">
                    Not Found Products!
                  </p>
                  <img
                    className={`max-w-xs`}
                    src={notFoundProducts}
                    alt="not Found Products"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default Discounts;
