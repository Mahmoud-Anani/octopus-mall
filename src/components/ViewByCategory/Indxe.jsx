import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { useRecoilState } from "recoil";
import { mainProductsState, products } from "../../store/ViewProductHome";
import { Link } from "react-router-dom";
import axios from "axios";
import {EGP} from "../components-products/FormatPrice";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function ViewByCategoryIndex({
  category_id,
  imgCoverCategory = "https://s3-alpha-sig.figma.com/img/e569/1614/44be4cfea24366cb3d27cb335105ed84?Expires=1694390400&Signature=BIRthGEKtl2o79AygtX7Xk30uHBHKR9UeJgBC3iDhAUhLYdx2aPzkg-HpRN-IS7E7tCVVEmkIjK7TO31ogOTAnAnezsFrOYTXRP7c0BChx1bqZiQRnYbraPY08U6OjY6rn-OSCnVK37MppzuiRjLGIUY12Wf3wt0sdbf~-x30faSbts9Z57GHlnqZb7nTUzx427T0quXbN-T9ew7yuEnvu0ymkcfT7poYQ5~7zSC9Ao~wGFp2b8JMLu-TQL16pfr28RfKNEoGuft-6NwdwhJQRxMZPJc0uceradJrTQ04vIvKdmz7vmTFv78mbPuqH-R~BmaVXTvMhtqKXfaiPtT7A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
}) {
  // get spasific category {titleCategory}
  const [titleCategory, settitleCategory] = React.useState("");
  const getSpasificCategory = async () =>
    await axios
      .get(`${import.meta.env.VITE_DOMAIN_NAME}/api/v1/category/${category_id}`)
      .then((res) => settitleCategory(res.data.data.name));
  // handle products
  // const [producs] = useRecoilState(products);
  const [producs] = useRecoilState(mainProductsState);

  const [producsCategory, setProducsCategory] = React.useState([]);
  // tests
  // console.log("producsCategory", producsCategory);
  // console.log("titleCategory", titleCategory);

  React.useEffect(() => {
    if (producs.length > 0) {
      const proCategory = producs.filter(
        ({ category = 0 }) => category.toString() === category_id.toString()
      );
      setProducsCategory(proCategory);
    }
    getSpasificCategory();
  }, [producs]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={"section"} maxWidth={"xl"}>
        <CssBaseline />
        <div
          className={`flex sm:flex-row flex-col gap-2 justify-between items-between  rounded-lg bg-[#fff] border-4 border-[#DEE2E7] p-4 mt-2 border-1`}
        >
          {/* Handle Time */}
          <div
            className={`sm:w-[30%] flex sm:py-0 rounded-lg p-5 max-w-[100%] bg-cover bg-[url("https://s3-alpha-sig.figma.com/img/e569/1614/44be4cfea24366cb3d27cb335105ed84?Expires=1694390400&Signature=BIRthGEKtl2o79AygtX7Xk30uHBHKR9UeJgBC3iDhAUhLYdx2aPzkg-HpRN-IS7E7tCVVEmkIjK7TO31ogOTAnAnezsFrOYTXRP7c0BChx1bqZiQRnYbraPY08U6OjY6rn-OSCnVK37MppzuiRjLGIUY12Wf3wt0sdbf~-x30faSbts9Z57GHlnqZb7nTUzx427T0quXbN-T9ew7yuEnvu0ymkcfT7poYQ5~7zSC9Ao~wGFp2b8JMLu-TQL16pfr28RfKNEoGuft-6NwdwhJQRxMZPJc0uceradJrTQ04vIvKdmz7vmTFv78mbPuqH-R~BmaVXTvMhtqKXfaiPtT7A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4")]`}
          >
            <div className={`bottom-1 h-fit sm:py-10 sm:px-2 px-1 py-5`}>
              <p className={``}>{titleCategory}</p>
              <button
                className={`rounded-lg mt-4 text-[#1C1C1C] bg-[#FFF] hover:bg-[#8a8a8a] hover:text-[#FFF] border-1 text-base font-medium py-1 px-4 text-center`}
              >
                Source now
              </button>
            </div>
          </div>
          {/* Products on the Discounts */}
          <div className="w-[70%] md:mt-0 mt-2 mx-auto ">
            <div className={`flex gap-4 flex-wrap justify-around items-center`}>
              {producsCategory
                .slice(0, 6)
                .map(({ _id, imageCover, title, price }) => {
                  return (
                    <Link
                      to={`/products/${_id}`}
                      key={_id}
                      className="flex flex-wrap-reverse gap-5"
                    >
                      <div>
                        <div>
                          <p
                            className={`text-[#1C1C1C] my-2 text-base font-normal text-center`}
                          >
                            {title.length > 30
                              ? `${title.slice(0, 10)}...`
                              : title}
                          </p>
                          <div>
                            <p
                              className={`text-[#8B96A5] my-2 text-xs font-normal text-start`}
                            >
                              From
                              <br />
                              {EGP.format(price)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <img
                        className={`w-full sm:w-36 rounded-lg `}
                        src={imageCover}
                        alt={title}
                      />
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default ViewByCategoryIndex;
