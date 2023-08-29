import { atom } from "recoil";

const products = atom({
  key: "productsSearch",
  default: [],
});

export { products };
