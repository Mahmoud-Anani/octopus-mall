import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import FilterCategory from "./Filters/FilterCategory";

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/" to={"/"}>
    Home
  </Link>,
  <Typography key="3" color="text.primary">
    Products
  </Typography>,
];

const defaultTheme = createTheme();

function ProductsIndex() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={"section"} maxWidth={"xl"}>
        <CssBaseline />
        <div className="flex flex-col gap-5">
          {/* Route Now */}
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
          <div className={`grid sm:grid-cols-2 grid-cols-1`}>
            {/* filters */}
            <div className={`hidden sm:block`}>
              <FilterCategory />
            </div>
            {/* products */}
            <div>
              <FilterCategory />
            </div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default ProductsIndex;
