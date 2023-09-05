import React from "react";
import { useRecoilState } from "recoil";
import {
  mainProductsState,
  products,
  storeCategorys,
} from "../../store/ViewProductHome";
import axios from "axios";
import { filterCategory } from "../../store/FiltersStore";

let keywordSearch = "";

function CategoryNav() {
  // const [categorys] = useRecoilState(storeCategorys);

  const [categorys] = useRecoilState(storeCategorys);
  const [, setProductsState] = useRecoilState(products);

  const [mainProducts] = useRecoilState(mainProductsState);
  const [, setcategorySearchId] = useRecoilState(filterCategory);

  const getAllProfucts = async () => {
    setcategorySearchId("");
    setProductsState(mainProducts);
  };
  // Get Poducts

  const getProducts = async (categorySearchId) => {
    setcategorySearchId(categorySearchId);
    if (categorySearchId !== "" && keywordSearch === "") {
      // Get products by only category
      return await axios
        .get(
          `${
            import.meta.env.VITE_DOMAIN_NAME
          }/api/v1/products?category=${categorySearchId}&limit=${
            import.meta.env.VITE_LIMITPRODUCTS
          }`
        )
        .then((res) => {
          const data = res.data;
          setProductsState(data.data);
        });
    } else if (categorySearchId === "" && keywordSearch !== "") {
      // Get products by only keyword
      return await axios
        .get(
          `${
            import.meta.env.VITE_DOMAIN_NAME
          }/api/v1/products?keyword=${keywordSearch}&limit=${
            import.meta.env.VITE_LIMITPRODUCTS
          }`
        )
        .then((res) => {
          const data = res.data;
          setProductsState(data.data);
        });
    } else if (categorySearchId !== "" && keywordSearch !== "") {
      // Get products by category and keyword
      return await axios
        .get(
          `${
            import.meta.env.VITE_DOMAIN_NAME
          }/api/v1/products?keyword=${keywordSearch}&category=${categorySearchId}&limit=${
            import.meta.env.VITE_LIMITPRODUCTS
          }`
        )
        .then((res) => {
          const data = res.data;
          setProductsState(data.data);
        });
    } else {
      // Get products
      return await axios
        .get(
          `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/products?limit=${
            import.meta.env.VITE_LIMITPRODUCTS
          }`
        )
        .then((res) => {
          const data = res.data;
          setProductsState(data.data);
        });
    }
  };
  React.useEffect(() => {}, []);
  return (
    <>
      {categorys ? (
        <div
          className={`sm:hidden flex gap-5 flex-nowrap overflow-scroll p-2 `}
        >
          <button
            onClick={getAllProfucts}
            className={`px-2 py-1 bg-[#EFF2F4] rounded-lg text-[#0D6EFD] whitespace-nowrap`}
          >
            All category
          </button>
          {categorys.map((cate) => (
            <button
              onClick={() => getProducts(cate._id)}
              className={`px-2 py-1 bg-[#EFF2F4] rounded-lg text-[#0D6EFD] whitespace-nowrap`}
              key={cate._id}
            >
              {cate.name}
            </button>
          ))}
        </div>
      ) : (
        <div className="spinner ms-2"></div>
      )}
    </>
  );
}

export default CategoryNav;
