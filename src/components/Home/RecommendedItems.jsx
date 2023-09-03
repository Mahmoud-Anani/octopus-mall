import React from "react";
import {
  mainProductsState,
  producsDicountsState,
  products,
} from "../../store/ViewProductHome";
import { useRecoilState } from "recoil";
import ShowProductHome from "../components-products/ShowProductHome";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";

import notFoundProducts from "./../../assets/products/notFound-Products.gif"

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function RecommendedItems() {
  // handle products
  // const [producs] = useRecoilState(products);
  const [producs] = useRecoilState(mainProductsState);
  const [producsTopRivews, setProducsTopRivew] =
    useRecoilState(producsDicountsState);

  //   console.log(producsTopRivews);

  React.useEffect(() => {
    if (producs.length > 0) {
      const proTopRivew = producs.filter(
        ({ ratingsAverage = 0 }) => ratingsAverage >= 3
      );
      setProducsTopRivew(proTopRivew);
    }
  }, [producs]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={"section"} maxWidth={"xl"}>
        <CssBaseline />
        <p className={`text-[#1C1C1C] text-2xl font-semibold py-4`}>
          Recommended items
        </p>
        <div
          className={`grid  grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:md:grid-cols-5 gap-4 justify-between bg-[#F7F7F7] p-3 rounded-lg`}
        >
          {producsTopRivews.length > 0 ? (
            producsTopRivews.slice(0, 10).map((pro) => {
              return (
                <Link
                  to={`product/${pro._id}`}
                  key={pro._id}
                  className={`border-2 rounded-lg p-3 max-w-xl hover:bg-[#dad8d8] duration-300`}
                >
                  <ShowProductHome
                    key={pro._id}
                    imgUrl={pro.imageCover}
                    price={pro.price}
                    title={pro.title}
                    ratingsAverage={pro.ratingsAverage}
                  />
                </Link>
              );
            })
          ) : (
            <>
              <img
                className={`mx-auto w-full`}
                src={notFoundProducts}
                alt="not Found Products"
              />
              <p className="text-[#000000] text-center text-lg font-medium">
                Not Found Products!
              </p>
            </>
          )}
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default RecommendedItems;
