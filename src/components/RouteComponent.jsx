import React from "react";
import { useRecoilState } from "recoil";
import { filterCategoryData } from "../store/FiltersStore";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

function RouteComponent() {
  const [categoryNew, setcategoryNew] = useRecoilState(filterCategoryData);

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
    <Breadcrumbs
      className={`px-6 py-2 `}
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
}

export default RouteComponent;
