import React from "react";
// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
// Fetching
import axios from "axios";
// Format Numbers
import { EGP } from "./../components-products/FormatPrice";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function RelatedProducts({ categoryId ,productId}) {
  const [productsOfCategory, setproductsOfCategory] = React.useState([]);
  async function getRelatedProducts() {
    await axios
      .get(
        `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/products?limit=${
          import.meta.env.VITE_LIMITPRODUCTS || 10000
        }&category=${categoryId}`
      )
      .then((res) => {
        const data = res.data.data.filter(({ _id }) => _id !== productId);
        setproductsOfCategory(data);
      });
  }
  React.useEffect(() => {
    getRelatedProducts();
  }, []);

  if (productsOfCategory.length <= 0) {
    return null
  }
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component={"section"} maxWidth={"xl"}>
          <CssBaseline />
          <div
            className={`bg-[#FFF] ${
              productsOfCategory.length > 0 && "p-5"
            } flex flex-col gap-5 mt-5 rounded-lg border-1`}
          >
            <h2 className={`text-[#1C1C1C] text-xl font-semibold`}>
              Related products
            </h2>
            {/* Content Products */}
            <div
              className={`grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6`}
            >
              {productsOfCategory
                .slice(0, 6)
                .map(({ imgCover, title, price, _id }) => (
                  <div
                    key={_id}
                    className={`flex flex-col gap-3 justify-start`}
                  >
                    <div className={`bg-[#EEE] p-4 rounded-xl`}>
                      <img className="w-32" src={imgCover} alt={title} />
                    </div>
                    <h4 className={`text-[#505050] text-base font-normal`}>
                      {title.length > 20 ? `${title.slice(0, 10)}...` : title}
                    </h4>
                    <span className={`text-[#8B96A5] text-base font-normal`}>
                      {EGP.format(price)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </Container>
      </ThemeProvider>
    );
}

export default RelatedProducts;
