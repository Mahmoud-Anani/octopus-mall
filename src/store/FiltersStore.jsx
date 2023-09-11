import { atom } from "recoil";

// Category
const filterCategory = atom({
  key: "filterCategory",
  default: "",
});

const filterCategoryData = atom({
  key: "filterCategoryData",
  default: "",
});

// all filters


export { filterCategory, filterCategoryData };
