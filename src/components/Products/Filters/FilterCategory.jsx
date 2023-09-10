import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  keywordSearchState,
  products,
  storeCategorys,
} from "../../../store/ViewProductHome";
import { filterCategory } from "../../../store/FiltersStore";
import axios from "axios";

function FilterCategory() {
  // hendle get Categorys
  const [categorysState] = useRecoilState(storeCategorys);
  // const getCategorys = async () => {
  //     await
  // }
  //   React.useEffect(() => {
  //     getCategorys();
  //   }, []);
  const [, settfilterCategoryState] = useRecoilState(filterCategory);

  const [keywordSearch] = useRecoilState(keywordSearchState);
  const [, setProducts] = useRecoilState(products);

  const getProducts = async (categorySearchId) => {
    if (categorySearchId !== "" && keywordSearch === "") {
      // Get products by only category
      return await axios
        .get(
          `${
            import.meta.env.VITE_DOMAIN_NAME
          }/api/v1/products?category=${categorySearchId}&limit=${
            import.meta.env.VITE_LIMITPRODUCTS || 10000
          }`
        )
        .then((res) => {
          const data = res.data;
          setProducts(data.data);
        });
    } else if (categorySearchId === "" && keywordSearch !== "") {
      // Get products by only keyword
      return await axios
        .get(
          `${
            import.meta.env.VITE_DOMAIN_NAME
          }/api/v1/products?keyword=${keywordSearch}&limit=${
            import.meta.env.VITE_LIMITPRODUCTS || 10000
          }`
        )
        .then((res) => {
          const data = res.data;
          setProducts(data.data);
        });
    } else if (categorySearchId !== "" && keywordSearch !== "") {
      // Get products by category and keyword
      return await axios
        .get(
          `${
            import.meta.env.VITE_DOMAIN_NAME
          }/api/v1/products?keyword=${keywordSearch}&category=${categorySearchId}&limit=${
            import.meta.env.VITE_LIMITPRODUCTS
          }`
        )
        .then((res) => {
          const data = res.data;
          setProducts(data.data);
        });
    } else {
      // Get products
      return await axios
        .get(
          `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/products?limit=${
            import.meta.env.VITE_LIMITPRODUCTS || 10000
          }`
        )
        .then((res) => {
          const data = res.data;
          setProducts(data.data);
        });
    }
  };

  // console.log(filterCategoryClick_id);
  // Handle see all Category
  const [seeAllCategory, setSeeAllCategory] = React.useState(false);
  return (
    <>
      <Accordion className={`max-w-xs`} defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails className={`flex flex-col gap-1`}>
          {!seeAllCategory ? (
            <React.Fragment>
              {categorysState.slice(0, 5).map(({ _id, name }) => (
                <button
                  key={_id}
                  className={`text-start hover:bg-slate-200 p-2 rounded-lg`}
                  onClick={() => {
                    settfilterCategoryState(_id);
                    getProducts(_id);
                  }}
                >
                  {name}
                </button>
              ))}
              <button
                className={`text-start text-[#0D6EFD]`}
                onClick={() =>
                  seeAllCategory === false && setSeeAllCategory(true)
                }
              >
                See all
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {categorysState.map(({ _id, name }) => (
                <button
                  key={_id}
                  className={`text-start hover:bg-slate-200 p-2 rounded-lg`}
                  onClick={() => {
                    settfilterCategoryState(_id);
                    getProducts(_id);
                  }}
                >
                  {name}
                </button>
              ))}
              <button
                className={`text-start text-[#0D6EFD]`}
                onClick={() =>
                  seeAllCategory === true && setSeeAllCategory(false)
                }
              >
                hide
              </button>
            </React.Fragment>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion className={`max-w-xs`} defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default FilterCategory;

/*
  const addToFilterCategory = (_id = flase, name = flase) => {
    const checkIsSeted = filterCategoryClick_id.findIndex(
      (filter_id) => filter_id === _id
    );
    {
    }
    if (checkIsSeted === -1) {
      setfilterCategoryClick([...filterCategoryClick_id, _id]);
    } else {
      const arrayRemoved = filterCategoryClick_id.filter(
        (categoryRemoved_id) => categoryRemoved_id !== _id
      );
      setfilterCategoryClick(arrayRemoved);
    }
  };



      <Accordion className={`max-w-xs`} defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={`max-w-xs`} defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={`max-w-xs`} defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
*/
