import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { products } from "../../../store/ViewProductHome";
import { useRecoilState } from "recoil";
import { filterCategory, filterRatingData } from "../../../store/FiltersStore";

function FilterRatings() {
  const [ratingValueMin, setratingValueMin] = React.useState(1);
  const [ratingValueMax, setratingValueMax] = React.useState(3);

  const [, setfilterRatingDataStore] = useRecoilState(filterRatingData);
  const [, setProducts] = useRecoilState(products);
  const [filterCategoryStore] = useRecoilState(filterCategory);
  async function FilterRating() {
    if (filterCategoryStore !== "") {
      await axios
        .get(
          `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/products?limit=${
            import.meta.env.VITE_LIMITPRODUCTS || 10000
          }&category=${filterCategoryStore}&ratingsAverage[lte]=${ratingValueMax}&ratingsAverage[gte]=${ratingValueMin}`
        )
        .then((res) => setProducts(res.data.data));
    } else {
      await axios
        .get(
          `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/products?limit=${
            import.meta.env.VITE_LIMITPRODUCTS || 10000
          }&ratingsAverage[lte]=${ratingValueMax}&ratingsAverage[gte]=${ratingValueMin}`
        )
        .then((res) => setProducts(res.data.data));
    }
  }

  return (
    <Accordion className={`max-w-xs`} defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Ratings</Typography>
      </AccordionSummary>
      <AccordionDetails className={`flex flex-col gap-1`}>
        <div className={`flex flex-col`}>
          <label>Min:</label>
          <Rating
            name="simple-controlled"
            value={ratingValueMin}
            onChange={(event, newValue) => {
              setratingValueMin(newValue);
              setfilterRatingDataStore({
                min: ratingValueMin,
                max: ratingValueMax,
              });
              FilterRating();
            }}
          />
        </div>
        <div className={`flex flex-col`}>
          <label>Max:</label>

          <Rating
            name="simple-controlled"
            value={ratingValueMax}
            onChange={(event, newValue) => {
              setratingValueMax(newValue);
              setfilterRatingDataStore({
                min: ratingValueMin,
                max: ratingValueMax,
              });
              FilterRating();
            }}
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default FilterRatings;
