import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import FilterCategory from "./Filters/FilterCategory";
import { useRecoilState } from "recoil";
import { products } from "../../store/ViewProductHome";
import CategoryNav from "../MobileComponents/CategoryNav";
import { filterCategory } from "../../store/FiltersStore";
import axios from "axios";



const defaultTheme = createTheme();

function ProductsIndex() {
  const [productsState] = useRecoilState(products);

  const [filterCategoryState] = useRecoilState(filterCategory);
  const [categoryNew, setcategoryNew] = React.useState({});
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
          <div className={`grid sm:grid-cols-2 grid-cols-1`}>
            {/* filters */}
            <div className={`hidden sm:block w-fit `}>
              <FilterCategory />
            </div>
            {/* products */}
            <div className={`w-full flex flex-col gap-5`}>
              {productsState.map(({ title }) => (
                <Link key={title}>{title}</Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default ProductsIndex;
