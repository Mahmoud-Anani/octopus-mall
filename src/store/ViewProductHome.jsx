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


export { products, storeCategorys, loadingState };
