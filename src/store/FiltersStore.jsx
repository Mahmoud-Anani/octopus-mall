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
const filterPriceData = atom({
  key: "filterPriceData",
  default: {},
});

const filterRatingData = atom({
  key: "filterRatingData",
  default: {},
});

// all filters


export {
  filterCategory,
  filterCategoryData,
  filterPriceData,
  filterRatingData,
};
