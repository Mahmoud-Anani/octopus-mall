import { atom } from "recoil";

// Wishlist
const wishlistData = atom({
  key: "wishlistData",
  default: [],
});
const renderDataState = atom({
  key: "renderDataState",
  default: false,
});


export { wishlistData, renderDataState };
