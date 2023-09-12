import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Slider from "@mui/material/Slider";
import { EGP } from "../../components-products/FormatPrice";
import axios from "axios";
import { products } from "../../../store/ViewProductHome";
import { useRecoilState } from "recoil";
import { filterPriceData } from "../../../store/FiltersStore";

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;

function FilterPrice() {
  const [reangPrice, setReangPrice] = React.useState([200, 600]);

  const [, setfilterPriceDataState] = useRecoilState(filterPriceData);


  const handleReangPrice = (event, newValue, activeThumb) => {

    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setReangPrice([
        Math.min(newValue[0], reangPrice[1] - minDistance),
        reangPrice[1],
      ]);
    } else {
      setReangPrice([
        reangPrice[0],
        Math.max(newValue[1], reangPrice[0] + minDistance),
      ]);
    }
    setfilterPriceDataState({ min: reangPrice[0], max: reangPrice[1] });

  };
  const [, setProducts] = useRecoilState(products);


  async function filterPriceNow() {
    await axios
      .get(
        `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/products?limit=${
          import.meta.env.VITE_LIMITPRODUCTS || 10000
        }&price[gte]=${reangPrice[0]}&price[lte]=${reangPrice[1]}`
      )
      .then((res) => setProducts(res.data.data));
  }

  return (
    <Accordion className={`max-w-xs`} defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Price range</Typography>
      </AccordionSummary>
      <AccordionDetails className={`flex flex-col gap-1`}>
        <div>
          <Slider
            min={0}
            max={1000}
            getAriaLabel={() => "Minimum distance"}
            value={reangPrice}
            onChange={handleReangPrice}
            valueLabelDisplay="auto"
            // getAriaValueText={valuetext}
            disableSwap
          />
        </div>
        <div className={`flex flex-col gap-3`}>
          <div className={`flex flex-wrap  gap-2 justify-between`}>
            <div className={`flex flex-col gap-1`}>
              <label className={`text-[#1C1C1C] text-base font-normal`}>
                Min
              </label>
              <input
                className={`p-3 rounded-lg border-2 w-32 bg-[#FFF] text-[#BDC4CD] text-base font-normal`}
                value={EGP.format(reangPrice[0])}
                disabled={true}
                type="text"
                placeholder="0"
              />
            </div>
            <div className={`flex flex-col gap-1`}>
              <label className={`text-[#1C1C1C] text-base font-normal`}>
                Max
              </label>
              <input
                className={`p-3 rounded-lg border-2  w-32 bg-[#FFF] text-[#BDC4CD] text-base font-normal`}
                value={EGP.format(reangPrice[1])}
                disabled={true}
                type="text"
                placeholder="10000"
              />
            </div>
          </div>
          <button
            onClick={filterPriceNow}
            className={`text-[#0D6EFD] text-base font-medium rounded-lg border-2 p-3 bg-[#FFF] w-full`}
          >
            Apply
          </button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default FilterPrice;
