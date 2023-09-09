import React from "react";
// mui
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { Rating } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StoreIcon from "@mui/icons-material/Store";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
// State Mangemant
import { useRecoilState } from "recoil";
// Routes
import { Link } from "react-router-dom";
// Fetching
import axios from "axios";
// Silf Modules
import FilterCategory from "./Filters/FilterCategory";
import { products } from "../../store/ViewProductHome";
import CategoryNav from "../MobileComponents/CategoryNav";
import { filterCategory, filterCategoryData } from "../../store/FiltersStore";
import { EGP, normalNumber } from "./../components-products/FormatPrice";
import NotFoundProducts from "../notFound/NotFoundProducts";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { wishlistData } from "../../store/WishlistStore";

const defaultTheme = createTheme();

const dot = () => (
  <FiberManualRecordIcon className={`text-[#DEE2E7] p-1 border-1`} />
);

let wishisIds =[]

function ProductsIndex() {
  const [productsState] = useRecoilState(products);
  const [productsStatePrivate, setproductsStatePrivate] =
    React.useState(productsState);

  const [filterCategoryState] = useRecoilState(filterCategory);
  const [wishlistDataStore, setwishlistDataStore] =
    useRecoilState(wishlistData);

  const [categoryNew, setcategoryNew] = useRecoilState(filterCategoryData);
  const getSingleCategory = async () => {
    await axios
      .get(
        `${
          import.meta.env.VITE_DOMAIN_NAME
        }/api/v1/category/${filterCategoryState}`
      )
      .then((res) => setcategoryNew(res.data.data));
  };
  React.useEffect(() => {
    getSingleCategory();
  }, [filterCategoryState]);

  const breadcrumbs = [
    <Link
      underline="hover"
      className="hover:bg-slate-300 p-2 rounded-lg text-[#8B96A5]"
      key="1"
      color="inherit"
      href="/"
      to={"/"}
    >
      Home
    </Link>,
    <Typography className="text-[#8B96A5]" key="3" color="text.primary">
      Products
    </Typography>,
    <Typography className="text-[#8B96A5]" key="3" color="text.primary">
      {categoryNew.name}
    </Typography>,
  ];

  const [styleView, setStyleView] = React.useState("col");

  // Get cookies
  const [cookies] = useCookies(["token"]);

  // add product to wishlist
  const postAddWishlist = async (_id) => {
    if (!cookies.token || cookies.token === undefined) {
      toast.error("You must log in first!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      await axios
        .post(
          `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/wishlist`,
          {
            productId: _id,
          },
          {
            headers: {
              Authorization: cookies.token,
            },
          }
        )
        .then((res) =>
          toast.success(`${res.data.message}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        );
    }
  };
  const postRemoveWishlist = async (_id) => {
    if (!cookies.token || cookies.token === undefined) {
      toast.error("You must log in first!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      await axios
        .delete(`${import.meta.env.VITE_DOMAIN_NAME}/api/v1/wishlist/${_id}`, {
          headers: {
            Authorization: cookies.token,
          },
        })
        .then((res) =>
          toast.success(`${res.data.message}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        );
    }
  };
  // Get wishlist
  const [wishlistIds, setWishlistIds] = React.useState([]);
  const getWishlist = async () => {
    await axios
      .get(`${import.meta.env.VITE_DOMAIN_NAME}/api/v1/wishlist`, {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((res) => {
        setwishlistDataStore(res.data.data.wishlist);
        setWishlistIds(res.data.data.wishlist);
      });

    };
    // console.log("wishisIds", wishisIds);

  const fevoretProducts = (_id) => {
    const fevrote = wishlistIds.find((dataId) => dataId._id === _id);
    return fevrote;
  };

  const [renderFeverote, setrenderFeverote] = React.useState("");
  const wishlist = (_id) => {
    // i have new all ids for wishlist and i have _id or product ==Then==> if _id === wishlist_id ? FavoriteIcon : FavoriteBorderIcon
    const fevroteReturn = fevoretProducts(_id);
    // console.log(fevroteReturn);
    return (
      <button
        onClick={() => {
          if (fevroteReturn) {
            // remove out my wishlist
            postRemoveWishlist(_id);
            getWishlist();
          } else {
            // set in my wishlist
            postAddWishlist(_id);
            getWishlist();
          }
        }}
        className={`border-2 rounded-lg p-1 hover:bg-slate-100 `}
      >
        {fevroteReturn ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </button>
    );
  };

  React.useEffect(() => {
    getWishlist();
  }, [productsStatePrivate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CategoryNav />
      <Container component={"section"} maxWidth={"xl"}>
        <CssBaseline />
        <div className="flex flex-col gap-5">
          {/* Route Now */}
          <Breadcrumbs
            className={`px-6 py-2 `}
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
          <div className={`grid sm:grid-cols-3 grid-cols-1 `}>
            {/* filters */}
            <div className={`hidden sm:block w-fit `}>
              <FilterCategory />
            </div>
            {/* products */}
            <div className={` flex flex-col gap-5 col-span-2`}>
              {/* style view && Header */}
              <div
                className={`flex justify-between rounded-md bg-[#FFF] border-2-[#DEE2E7] p-3`}
              >
                <div>
                  {normalNumber.format(productsStatePrivate.length)} items{" "}
                  {categoryNew.name ? "on" : "in"}{" "}
                  {categoryNew.name ? <b>{categoryNew.name}</b> : <b>store</b>}
                </div>
                <div className={`flex gap-2`}>
                  <button onClick={() => setStyleView("row")}>
                    <GridViewIcon />
                  </button>
                  <button onClick={() => setStyleView("col")}>
                    <TableRowsIcon />
                  </button>
                </div>
              </div>
              {/* check if product exist  or found and contener products && step two check if a user have style row or col */}
              {productsStatePrivate.length <= 0 ? (
                <NotFoundProducts />
              ) : styleView === "col" ? (
                <div
                  className={`flex flex-col flex-wrap justify-between gap-5 rounded-md bg-[#FFF] border-2-[#DEE2E7] p-3`}
                >
                  {/* single product */}
                  {productsStatePrivate.map(
                    ({
                      _id,
                      title,
                      description,
                      quantity,
                      sold,
                      priceAfterDiscount,
                      price,
                      imageCover,
                      ratingsAverage,
                      slug,
                    }) => (
                      <div className={`flex items-center gap-5 `} key={_id}>
                        {/* Image Product */}
                        <img
                          className={`w-44 rounded-sm`}
                          src={imageCover}
                          alt={title}
                        />
                        {/* Content Product */}
                        <div className={`flex flex-col gap-1`}>
                          <div className={`flex justify-between`}>
                            <h1
                              className={`text-[#1C1C1C] text-base font-medium`}
                            >
                              {title}
                            </h1>
                            {wishlist(_id)}
                          </div>
                          {priceAfterDiscount ? (
                            <div className="flex gap-5">
                              <span
                                className={`text-[#1C1C1C] text-xl font-semibold`}
                              >
                                {EGP.format(priceAfterDiscount)}
                              </span>
                              <del
                                className={`text-[#8B96A5] text-base font-semibold`}
                              >
                                {EGP.format(price)}
                              </del>
                            </div>
                          ) : (
                            <div
                              className={`text-[#1C1C1C] text-xl font-semibold`}
                            >
                              {EGP.format(price)}
                            </div>
                          )}
                          {/* ratings */}
                          <div className={`flex items-center gap-5`}>
                            <div className={`flex items-center gap-1`}>
                              <Rating
                                name="read-only"
                                value={ratingsAverage}
                                readOnly
                              />
                              <span
                                className={`text-[#FF9017] text-base font-normal`}
                              >
                                {ratingsAverage}
                              </span>
                            </div>
                            {dot()}
                            <div>
                              <span
                                className={`text-[#8B96A5] text-base font-normal`}
                              >
                                {sold}&#160; orders
                              </span>
                            </div>
                            {dot()}

                            <div>
                              {quantity}&#160;
                              <StoreIcon />
                            </div>
                            {dot()}
                            <div
                              className={`text-[#00B517] text-base font-normal`}
                            >
                              free
                            </div>
                          </div>
                          {/* description */}
                          <h2
                            className={`text-[#505050] text-base font-normal`}
                          >
                            {description}
                          </h2>
                          <Link
                            to={`/products/${slug}`}
                            className={`text-[#0D6EFD] text-base font-medium`}
                          >
                            View details
                          </Link>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div
                  className={`flex flex-col flex-wrap justify-between gap-5 rounded-md bg-[#FFF] border-2-[#DEE2E7] p-3`}
                >
                  {/* single product */}
                  {productsStatePrivate.map(
                    ({
                      _id,
                      title,
                      description,
                      quantity,
                      sold,
                      priceAfterDiscount,
                      price,
                      imageCover,
                      ratingsAverage,
                      slug,
                    }) => (
                      <div className={`flex items-center gap-5 `} key={_id}>
                        {/* Image Product */}
                        <img className={`w-44`} src={imageCover} alt={title} />
                        {/* Content Product */}
                        <div className={`flex flex-col gap-1`}>
                          <h2
                            className={`text-[#1C1C1C] text-base font-medium`}
                          >
                            {title}
                          </h2>
                          {priceAfterDiscount ? (
                            <div className="flex gap-5">
                              <span
                                className={`text-[#1C1C1C] text-xl font-semibold`}
                              >
                                {EGP.format(priceAfterDiscount)}
                              </span>
                              <del
                                className={`text-[#8B96A5] text-base font-semibold`}
                              >
                                {EGP.format(price)}
                              </del>
                            </div>
                          ) : (
                            <div
                              className={`text-[#1C1C1C] text-xl font-semibold`}
                            >
                              {EGP.format(price)}
                            </div>
                          )}
                          {/* ratings */}
                          <div className={`flex items-center gap-5`}>
                            <div className={`flex items-center gap-1`}>
                              <Rating
                                name="read-only"
                                value={ratingsAverage}
                                readOnly
                              />
                              <span
                                className={`text-[#FF9017] text-base font-normal`}
                              >
                                {ratingsAverage}
                              </span>
                            </div>
                            {dot()}
                            <div>
                              <span
                                className={`text-[#8B96A5] text-base font-normal`}
                              >
                                {sold}&#160; orders
                              </span>
                            </div>
                            {dot()}

                            <div>
                              {quantity}&#160;
                              <StoreIcon />
                            </div>
                            {dot()}
                            <div
                              className={`text-[#00B517] text-base font-normal`}
                            >
                              free
                            </div>
                          </div>
                          {/* description */}
                          <h2
                            className={`text-[#505050] text-base font-normal`}
                          >
                            {description}
                          </h2>
                          <Link
                            to={`/products/${slug}`}
                            className={`text-[#0D6EFD] text-base font-medium`}
                          >
                            View details
                          </Link>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default ProductsIndex;
