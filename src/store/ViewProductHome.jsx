import { atom } from "recoil";

const products = atom({
  key: "productsSearch",
  default: [],
});

const storeCategorys = atom({
  key: "categorys",
  default: [],
});

export { products, storeCategorys };
