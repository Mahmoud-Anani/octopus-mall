import { atom } from "recoil";

// loadings
const loadingState = atom({
  key: "loadingState",
  default: true,
});

// products
const products = atom({
  key: "productsSearch",
  default: [],
});

const mainProductsState = atom({
  key: "mainProductsState",
  default: [],
});

const producsDicountsState = atom({
  key: "producsDicountsState",
  default: [],
});

const producsTopReviewaState = atom({
  key: "producsTopReviewaState",
  default: [],
});

// Categorys
const storeCategorys = atom({
  key: "categorys",
  default: [],
});

// suppliers الموردين
const suppliersState = atom({
  key: "suppliersState",
  default: [],
});

// Logo
const sideShowState = atom({
  key: "sideShowState",
  default: "-left-full",
});

// keywordSearch
const keywordSearchState = atom({
  key: "keywordSearchState",
  default: "",
});

// Brand
const brandsStore = atom({
  key: "brandsStore",
  default: [],
});

export {
  products,
  storeCategorys,
  loadingState,
  producsDicountsState,
  producsTopReviewaState,
  suppliersState,
  sideShowState,
  mainProductsState,
  keywordSearchState,
  brandsStore,
};
