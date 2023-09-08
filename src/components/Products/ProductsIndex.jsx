import React from "react";
// mui
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
// State Mangemant
import { useRecoilState } from "recoil";
// Routes
import { Link } from "react-router-dom";
// Fetching
import axios from "axios";
// Silf Modules
import FilterCategory from "./Filters/FilterCategory";
import { products } from "../../store/ViewProductHome";
import CategoryNav from "../MobileComponents/CategoryNav";
import { filterCategory, filterCategoryData } from "../../store/FiltersStore";
import { normalNumber } from "./../components-products/FormatPrice";

const defaultTheme = createTheme();

function ProductsIndex() {
  const [productsState] = useRecoilState(products);

  const [filterCategoryState] = useRecoilState(filterCategory);

  const [categoryNew, setcategoryNew] = useRecoilState(filterCategoryData);
  const getSingleCategory = async () => {
    await axios
      .get(
        `${
          import.meta.env.VITE_DOMAIN_NAME
        }/api/v1/category/${filterCategoryState}`
      )
      .then((res) => setcategoryNew(res.data.data));
  };
  React.useEffect(() => {
    getSingleCategory();
  }, [filterCategoryState]);

  const breadcrumbs = [
    <Link
      underline="hover"
      className="hover:bg-slate-300 p-2 rounded-lg text-[#8B96A5]"
      key="1"
      color="inherit"
      href="/"
      to={"/"}
    >
      Home
    </Link>,
    <Typography className="text-[#8B96A5]" key="3" color="text.primary">
      Products
    </Typography>,
    <Typography className="text-[#8B96A5]" key="3" color="text.primary">
      {categoryNew.name}
    </Typography>,
  ];

  const [styleView, setStyleView] = React.useState("col");

  return (
    <ThemeProvider theme={defaultTheme}>
      <CategoryNav />
      <Container component={"section"} maxWidth={"xl"}>
        <CssBaseline />
        <div className="flex flex-col gap-5">
          {/* Route Now */}
          <Breadcrumbs
            className={`px-6 py-2 `}
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
          <div className={`grid sm:grid-cols-3 grid-cols-1`}>
            {/* filters */}
            <div className={`hidden sm:block w-fit `}>
              <FilterCategory />
            </div>
            {/* products */}
            <div className={`flex flex-col gap-5 col-span-2`}>
              {/* style view && Header */}
              <div
                className={`flex justify-between rounded-md bg-[#FFF] border-2-[#DEE2E7] p-3`}
              >
                <div>
                  {normalNumber.format(productsState.length)} items{" "}
                  {categoryNew.name ? "on" : "in"}{" "}
                  {categoryNew.name ? <b>{categoryNew.name}</b> : <b>store</b>}
                </div>
                <div className={`flex gap-2`}>
                  <button onClick={() => setStyleView("row")}>
                    <GridViewIcon />
                  </button>
                  <button onClick={() => setStyleView("col")}>
                    <TableRowsIcon />
                  </button>
                </div>
              </div>
              <div
                className={`flex flex-${styleView} flex-wrap justify-between gap-5 rounded-md bg-[#FFF] border-2-[#DEE2E7] p-3`}
              >
                {productsState.map(({ title }) => (
                  <Link key={title}>{title}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default ProductsIndex;
