import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { useRecoilState } from "recoil";
import { products } from "../../store/ViewProductHome";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
let producsDicountsAlias = [];
let stopeSetProductsDiscounts = true;
function Discounts() {
  // handle products
  const [producs] = useRecoilState(products);
  const [producsDicounts, setProducsDicounts] = React.useState([]);
  const uniqueDataArray =()=> Array.from(
    new Set(producsDicountsAlias.map(({ _id }) => _id))
  ).map((value) => {
    return producsDicountsAlias.find(
      (item) => item._id === value && setProducsDicounts([...producsDicounts,item])
    );
  });
// console.log(producsDicounts);
  // handle time
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    if (producs) {
      producs.map(
        (pro) => pro?.priceAfterDiscount > 0 && producsDicountsAlias.push(pro)
      );
      uniqueDataArray();
    }
  }, [producs]);

  React.useLayoutEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
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
          className={`flex rounded-lg bg-[#fff] border-4 border-[#DEE2E7] p-4 mt-2 border-1`}
        >
          {/* Handle Time */}
          <div className={`bottom-1 flex flex-col gap-3 `}>
            <div className="flex flex-col ">
              <p className={`font-semibold text-xl text-[#1C1C1C]`}>
                Deals and offers
              </p>
              <p className={`text-[#8B96A5] text-base font-normal`}>
                Hygiene equipments
              </p>
            </div>
            <div className={`flex gap-2`}>
              <div
                className={`rounded-lg bg-[#606060] flex flex-col p-2 text-center`}
              >
                <span className={`text-[#FFF] text-base font-bold`}>
                  {month}/{day}
                </span>
                <span className={`text-[#FFF] text-xs font-normal`}>Days</span>
              </div>
              <div
                className={`rounded-lg bg-[#606060] flex flex-col p-2 text-center`}
              >
                <span className={`text-[#FFF] text-base font-bold`}>
                  {hours} {ampm}
                </span>
                <span className={`text-[#FFF] text-xs font-normal`}>Hour</span>
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
          {/* Products on the Discounts */}
          <div></div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default Discounts;
