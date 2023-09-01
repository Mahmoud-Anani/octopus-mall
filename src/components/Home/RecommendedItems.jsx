import React from "react";
import { producsDicountsState, products } from "../../store/ViewProductHome";
import { useRecoilState } from "recoil";
import ShowProductHome from "../components-products/ShowProductHome";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function RecommendedItems() {
  // handle products
  const [producs] = useRecoilState(products);
  const [producsTopRivews, setProducsTopRivew] =
    useRecoilState(producsDicountsState);

  //   console.log(producsTopRivews);

  React.useEffect(() => {
    if (producs.length > 0) {
      const proTopRivew = producs.filter(
        ({ ratingsAverage = 0 }) => ratingsAverage >= 4
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
          className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:md:grid-cols-5 gap-4 justify-between bg-[#F7F7F7] p-3 rounded-lg`}
        >
          {producsTopRivews.slice(0, 10).map((pro) => {
            return (
              <Link
                to={`product/${pro._id}`}
                key={pro._id}
                className={`border-2 rounded-lg p-3 max-w-xl`}
              >
                <ShowProductHome
                  key={pro._id}
                  imgUrl={pro.imageCover}
                  price={pro.price}
                  title={pro.title}
                />
              </Link>
            );
          })}
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default RecommendedItems;
