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
import CloseIcon from "@mui/icons-material/Close";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// State Mangemant
import { useRecoilState } from "recoil";
// Routes
import { Link, useNavigate } from "react-router-dom";
// Fetching
import axios from "axios";
// Silf Modules
import FilterCategory from "./Filters/FilterCategory";
import {
  keywordSearchState,
  mainProductsState,
  products,
} from "../../store/ViewProductHome";
import CategoryNav from "../MobileComponents/CategoryNav";
import {
  filterCategory,
  filterCategoryData,
  filterPriceData,
  filterRatingData,
} from "../../store/FiltersStore";
import { EGP, normalNumber } from "./../components-products/FormatPrice";
import NotFoundProducts from "../notFound/NotFoundProducts";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { wishlistData } from "../../store/WishlistStore";
import Footer from "../layout/Footer";
import Copyright from "../Copyright";
import FilterPrice from "./Filters/FilterPrice";
import FilterRatings from "./Filters/FilterRatings";
import RouteComponent from "../RouteComponent";

const defaultTheme = createTheme();

const dot = () => (
  <FiberManualRecordIcon className={`text-[#DEE2E7] p-1 border-1`} />
);

function ProductsIndex() {
  const [productsState, setProducts] = useRecoilState(products);

  const copyHandleNamberPagination = productsState;

  const [filterCategoryState, setfilterCategoryState] =
    useRecoilState(filterCategory);
  const [, setwishlistDataStore] = useRecoilState(wishlistData);

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

  const navigateor = useNavigate();
  const [keyReloadWishlist, setkeyReloadWishlist] = React.useState(1);

  const reloadComponentWishlist = () => {
    // زيادة قيمة المفتاح لإعادة تحميل الـ component
    setkeyReloadWishlist(keyReloadWishlist + 1);
  };

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
            reloadComponentWishlist();
          } else {
            // set in my wishlist
            postAddWishlist(_id);
            reloadComponentWishlist();
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
  }, [productsState]);

  const [filterCategoryDataState, settfilterCategoryState] =
    useRecoilState(filterCategoryData);
  const [filterPriceDataState, setfilterPriceDataState] =
    useRecoilState(filterPriceData);

  const [mainProductsData] = useRecoilState(mainProductsState);

  const getProducts = async (page) => {
    // Get products
    return await axios
      .get(`${import.meta.env.VITE_DOMAIN_NAME}/api/v1/products?page=${page}`)
      .then((res) => {
        const data = res.data;
        setProducts(data.data);
      });
  };

  // const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    // setPage(value);
    getProducts(value);
  };
  const [filterRatingDataStore, setfilterRatingDataStore] =
    useRecoilState(filterRatingData);

  return (
    <ThemeProvider theme={defaultTheme} key={keyReloadWishlist}>
      <CategoryNav />
      <Container component={"section"} maxWidth={"xl"}>
        <CssBaseline />
        <div className="flex flex-col gap-5">
          {/* Route Now */}
    <RouteComponent />
          <div className={`grid sm:grid-cols-3 grid-cols-1 gap-3`}>
            {/* filters */}
            <div className={`hidden sm:block w-fit `}>
              <FilterCategory />
              <FilterPrice />
              <FilterRatings />
            </div>
            {/* products */}
            <div className={` flex flex-col gap-2 col-span-2`}>
              <div className="flex flex-wrap gap-2">
                {filterCategoryDataState?.name && (
                  <div
                    className={`border-solid border-2 border-sky-500   rounded-lg w-fit px-3 py-1 bg-[#FFF] `}
                  >
                    {filterCategoryDataState.name}
                  </div>
                )}
                {filterPriceDataState?.min && (
                  <div
                    className={`border-solid border-2 border-sky-500   rounded-lg w-fit px-3 py-1 bg-[#FFF] `}
                  >
                    {EGP.format(filterPriceDataState.min)} :{" "}
                    {EGP.format(filterPriceDataState.max)}
                  </div>
                )}
                {filterRatingDataStore?.min && (
                  <div
                    className={`border-solid border-2 border-sky-500   rounded-lg w-fit px-3 py-1 bg-[#FFF] `}
                  >
                    {filterRatingDataStore.min} : {filterRatingDataStore.max}{" "}
                    ⭐️
                  </div>
                )}
                {filterCategoryDataState?.name ||
                filterPriceDataState?.min ||
                filterRatingDataStore?.min ? (
                  <button
                    className={`bg-red-200  p-1 rounded-lg`}
                    onClick={() => {
                      settfilterCategoryState("");
                      setProducts(mainProductsData);
                      setfilterCategoryState("");
                      setfilterPriceDataState({});
                      setfilterRatingDataStore({});
                    }}
                  >
                    Clear
                    <CloseIcon />
                  </button>
                ) : null}
              </div>
              {/* style view && Header */}
              <div
                className={`flex justify-between rounded-md bg-[#FFF] border-2-[#DEE2E7] p-3`}
              >
                <div>
                  {normalNumber.format(productsState.length)} items{" "}
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
              {productsState.length <= 0 ? (
                <NotFoundProducts />
              ) : styleView === "col" ? (
                <div
                  className={`flex flex-col flex-wrap justify-between gap-5 rounded-md bg-[#FFF] border-2-[#DEE2E7] p-3`}
                >
                  {/* single product */}
                  {productsState
                    .slice(0, 5)
                    .map(
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
                            className={`sm:w-44 w-32 rounded-sm `}
                            src={imageCover}
                            alt={title}
                          />
                          {/* Content Product */}
                          <div className={`flex flex-col gap-1`}>
                            <div className={`flex justify-between`}>
                              <h1
                                className={`text-[#1C1C1C] text-base font-medium mx-2`}
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
                            <div className={`flex flex-wrap items-center gap-5`}>
                              <div className={`flex items-center gap-1 `}>
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
                              <div className={`hidden sm:block`}>
                                {dot()}
                                <span
                                  className={`text-[#8B96A5] text-base font-normal`}
                                >
                                  {sold}&#160; orders
                                </span>
                                {dot()}
                              </div>

                              <div className={` hidden sm:block`}>
                                {quantity}&#160;
                                <StoreIcon />
                                {dot()}
                              </div>
                              <div
                                className={`text-[#00B517] text-base font-normal hidden sm:block`}
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
                  className={`flex  flex-wrap justify-center gap-4 rounded-md bg-[#FFF] border-2-[#DEE2E7] p-3`}
                >
                  {/* single product */}
                  {productsState
                    .slice(0, 15)
                    .map(
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
                        <Link
                          to={`/products/${slug}`}
                          className={`flex flex-col items-center gap-2 `}
                          key={_id}
                        >
                          {/* Image Product */}
                          <img
                            className={`w-56 rounded-lg`}
                            src={imageCover}
                            alt={title}
                          />
                          {/* Content Product */}
                          <div className={`flex flex-col gap-1`}>
                            <h2
                              className={`text-[#1C1C1C] text-base font-medium`}
                            >
                              {title.length < 20
                                ? title
                                : title.slice(0, 20) + "..."}
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
                            </div>
                            {/* description */}
                            <h2
                              className={`text-[#505050] text-base font-normal`}
                            >
                              {description.length < 20
                                ? description
                                : description.slice(0, 20) + "..."}
                            </h2>

                            {wishlist(_id)}
                          </div>
                        </Link>
                      )
                    )}
                </div>
              )}
              <div className="flex justify-end">
                <Stack spacing={2}>
                  <Pagination
                    count={mainProductsData.length / 5}
                    variant="outlined"
                    shape="rounded"
                    boundaryCount={3}
                    siblingCount={0}
                    onChange={handleChange}
                  />
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
      <Copyright />
    </ThemeProvider>
  );
}

export default ProductsIndex;
