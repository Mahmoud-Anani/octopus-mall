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

const storeCategorys = atom({
  key: "categorys",
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

// suppliers الموردين
const suppliersState = atom({
  key: "suppliersState",
  default: [],
});



export {
  products,
  storeCategorys,
  loadingState,
  producsDicountsState,
  producsTopReviewaState,
  suppliersState,
};
