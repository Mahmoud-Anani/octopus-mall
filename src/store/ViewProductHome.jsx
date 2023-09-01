import { atom } from "recoil";


const loadingState = atom({
  key: "loadingState",
  default: true,
});


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

export {
  products,
  storeCategorys,
  loadingState,
  producsDicountsState,
  producsTopReviewaState,
};
