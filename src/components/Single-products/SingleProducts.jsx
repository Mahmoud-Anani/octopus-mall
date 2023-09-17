import React from "react";
// mui
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline, Rating } from "@mui/material";
// Reacting
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TextField from "@mui/material/TextField";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from "@mui/icons-material/Update";
import EditNoteIcon from "@mui/icons-material/EditNote";
// react-router-dom
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import RouteComponent from "../RouteComponent";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Zoom, Navigation, Pagination } from "swiper/modules";

//
import { dot } from "../Products/ProductsIndex";
import { EGP, normalNumber } from "../components-products/FormatPrice";
import { useRecoilState } from "recoil";
import { loadingState } from "../../store/ViewProductHome";
import { useCookies } from "react-cookie";
import { wishlistData } from "../../store/WishlistStore";
import Footer from "../layout/Footer";
import { toast } from "react-toastify";
import RelatedProducts from "./RelatedProducts";
import Cart from "../cart/Cart";
import DiscountOf100 from "../ads/DiscountOf100";
import Copyright from "../Copyright";

// handle Reacting
const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

let fullNameMain = "";
let userImgMain = "";

function SingleProducts() {
  // get user data
  const [getCookios, setCookios] = useCookies([
    "token",
    "slug",
    "userImg",
    "_id",
  ]);

  const { productSlug } = useParams();
  const [product, setProduct] = React.useState({});
  const [reviews, setreviews] = React.useState([]);
  const [userLoggedHaveReview, setuserLoggedHaveReview] = React.useState(false);
  const [loading, setloading] = React.useState(true);

  const [colors, setcolors] = React.useState([]);
  // console.log(product);
  // get single product
  const getSingleProduct = async () => {
    await axios
      .get(`${import.meta.env.VITE_DOMAIN_NAME}/api/v1/products/${productSlug}`)
      .then((res) => {
        setProduct(res.data.data);
        setreviews(res.data.reviews);
        setloading(false);
        const checkUserReivew = res.data.reviews.find(
          (review) => review.user._id === getCookios._id
        ); // check if user logged have a reivew
        setuserLoggedHaveReview(checkUserReivew);
        if (res.data.data.color.length > 0) {
          const arrayColors = res.data?.data?.color[0].split(",");
          setcolors(arrayColors);
        }
      });
  };
  const [fullUserName, setfullUserName] = React.useState("");
  React.useEffect(() => {
    getSingleProduct();
    // handle auth user
    if (getCookios.slug) {
      const fullUserNameArray = getCookios.slug.split("-");
      // Change first litter UpperCase
      setfullUserName(
        `${
          fullUserNameArray[0][0].toUpperCase() + fullUserNameArray[0].slice(1)
        } ${
          fullUserNameArray[1][0].toUpperCase() + fullUserNameArray[1].slice(1)
        }`
      );
      fullNameMain = `${
        fullUserNameArray[0][0].toUpperCase() + fullUserNameArray[0].slice(1)
      } ${
        fullUserNameArray[1][0].toUpperCase() + fullUserNameArray[1].slice(1)
      }`;
      userImgMain = getCookios.userImg?.userImg || "";
    }
  }, [productSlug]);

  const [sizeImage, setSizeImage] = React.useState("100%");
  // function setImg(size) {
  //   return setSizeImage(size);
  // }
  // handle Description or end product
  const [contentDescription, setcontentDescription] =
    React.useState("Description");

  // Get Wishlist
  // Get cookies
  const [cookies] = useCookies(["token"]);
  const [wishlistStateDate, setwishlistDataStore] =
    useRecoilState(wishlistData);

  const getWishlist = async () => {
    return await axios
      .get(`${import.meta.env.VITE_DOMAIN_NAME}/api/v1/wishlist`, {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((res) => {
        setwishlistDataStore(res.data.data.wishlist);
      })
      .catch((err) => null);
  };

  React.useEffect(() => {
    getWishlist();
  }, []);

  const [showReviews, setshowReviews] = React.useState("hide");
  // Add user logged Review
  const [handleErrorAddReview, setHandleErrorAddReview] = React.useState("");
  const [ratingReview, setRatingReview] = React.useState(1);
  const [textReview, setTextReview] = React.useState("");
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (textReview === "" || textReview.length < 4) {
      throw setHandleErrorAddReview(
        "The text of the review should not be less than four letters"
      );
    }
    await axios
      .post(
        `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/reviews`,
        {
          reviewText: textReview,
          rating: ratingReview,
          product: product._id,
        },
        {
          headers: { Authorization: cookies.token },
        }
      )
      .then((res) => {
        setRatingReview(1);
        setTextReview("");
        getSingleProduct();
        toast.success("A successful addition", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  // @desc update review by user logged
  const inputReviewUpdate = React.useRef(null);
  const [typeInputUpdateReview, settypeInputUpdateReview] =
    React.useState(true);
  function handleUpdateReview() {
    // settypeInputUpdateReview(false)
    inputReviewUpdate.current.focus();
  }
  const [updateTextReview, setUpdateTextreview] = React.useState("");
  const [updateRatingReview, setUpdateRatingReview] = React.useState(1);
  const [changedupdateRatingReview, setChangedUpdateRatingReview] =
  React.useState(false);
  async function updateReview(e, _id_review, oldRating) {
    e.preventDefault();
    if (updateTextReview === "") {
      throw setHandleErrorAddReview(
        "The text of the review should not be less than four letters"
      );
    }
    // console.log(`${import.meta.env.VITE_DOMAIN_NAME}/api/v1/reviews/${_id_review}`);
    // console.log(`cookies.token`, cookies.token);
    await axios
      .put(
        `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/reviews/${_id_review}`,
        {
          reviewText: updateTextReview,
          rating: changedupdateRatingReview ? updateRatingReview : oldRating,
        },
        {
          headers: {
            Authorization: cookies.token,
          },
        }
      )
      .then((res) => {
        setChangedUpdateRatingReview(true);
        setUpdateTextreview("");
        getSingleProduct();
        toast.success("successful edit", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }

  // @desc delete review by logged
  async function handleDeleteReview(e, review_id) {
    e.preventDefault();
    await axios
      .delete(
        `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/reviews/${review_id}`,
        {
          headers: {
            Authorization: cookies.token,
          },
        }
      )
      .then((res) => {
        getSingleProduct();
        toast.success("successful delete", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }
  
  // handle Choose Color
  const [chooseColor, setChooseColor] = React.useState("");

  if (loading) {
    return (
      <div className="h-full my-5">
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={"section"} maxWidth={"xl"}>
        <CssBaseline />
        <RouteComponent />
        <div className={`bg-[#FFF] p-4 rounded-lg`}>
          {/* Top Product */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2  gap-10 justify-center bg-[#FFF] p-4 rounded-t-lg`}
          >
            {/* Images */}
            <div
              className={`w-[70%] sizeImage mx-auto cursor-zoom-in  overflow-hidden`}
            >
              <div className="mb-2">
                <button
                  onClick={() => setSizeImage("30%")}
                  className={`text-sm font-semibold border rounded-lg px-2 hover:bg-slate-300 `}
                >
                  Small
                </button>
                <button
                  onClick={() => setSizeImage("60%")}
                  className={`text-sm font-semibold border rounded-lg px-2 hover:bg-slate-300 mx-2`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setSizeImage("100%")}
                  className={`text-sm font-semibold border rounded-lg px-2 hover:bg-slate-300 `}
                >
                  Large
                </button>
              </div>
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                zoom={true}
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Zoom, Navigation, Pagination]}
                className="mySwiper  rounded-lg"
              >
                <SwiperSlide>
                  <div className="swiper-zoom-container">
                    <img
                      className={`w-[${sizeImage}]`}
                      src={product.imageCover}
                      alt={product.title}
                    />
                  </div>
                </SwiperSlide>
                {product.images &&
                  product?.images.map((img) => (
                    <SwiperSlide key={img + `${Math.random()}`}>
                      <div className="swiper-zoom-container">
                        <img src={img} />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
            {/* Detilse */}
            <div>
              {/* Stock */}
              <div className={`flex`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8.79508 15.875L4.62508 11.705L3.20508 13.115L8.79508 18.705L20.7951 6.70504L19.3851 5.29504L8.79508 15.875Z"
                    fill="#00B517"
                  />
                </svg>{" "}
                <span>In Stock</span>
              </div>
              <h2 className={`text-[#1C1C1C] text-xl font-semibold`}>
                {product.title}
              </h2>
              <div>
                <div className={`flex flex-wrap items-center`}>
                  <div className="text-[#FF9017] text-base font-normal flex items-center">
                    <Rating
                      name="read-only"
                      value={product.ratingsAverage}
                      readOnly
                    />
                    <span>{product.ratingsAverage}</span>
                  </div>
                  {dot()}

                  <div className={`flex items-center`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M3.33317 3.33329H16.6665V13.3333H4.30817L3.33317 14.3083V3.33329ZM3.33317 1.66663C2.4165 1.66663 1.67484 2.41663 1.67484 3.33329L1.6665 18.3333L4.99984 15H16.6665C17.5832 15 18.3332 14.25 18.3332 13.3333V3.33329C18.3332 2.41663 17.5832 1.66663 16.6665 1.66663H3.33317ZM4.99984 9.99996H14.9998V11.6666H4.99984V9.99996ZM4.99984 7.49996H14.9998V9.16663H4.99984V7.49996ZM4.99984 4.99996H14.9998V6.66663H4.99984V4.99996Z"
                        fill="#8B96A5"
                      />
                    </svg>
                    <span className="whitespace-nowrap">
                      {reviews.length} reviews
                    </span>
                    {dot()}
                  </div>

                  <div className={`flex items-center`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M18.3335 7.90834H14.3418L10.6918 2.44167C10.5335 2.20834 10.2668 2.09167 10.0002 2.09167C9.7335 2.09167 9.46683 2.20834 9.3085 2.45001L5.6585 7.90834H1.66683C1.2085 7.90834 0.833496 8.28334 0.833496 8.74167C0.833496 8.81667 0.841829 8.89167 0.866829 8.96667L2.9835 16.6917C3.17516 17.3917 3.81683 17.9083 4.5835 17.9083H15.4168C16.1835 17.9083 16.8252 17.3917 17.0252 16.6917L19.1418 8.96667L19.1668 8.74167C19.1668 8.28334 18.7918 7.90834 18.3335 7.90834ZM10.0002 4.40834L12.3335 7.90834H7.66683L10.0002 4.40834ZM15.4168 16.2417L4.59183 16.25L2.7585 9.57501H17.2502L15.4168 16.2417ZM10.0002 11.2417C9.0835 11.2417 8.3335 11.9917 8.3335 12.9083C8.3335 13.825 9.0835 14.575 10.0002 14.575C10.9168 14.575 11.6668 13.825 11.6668 12.9083C11.6668 11.9917 10.9168 11.2417 10.0002 11.2417Z"
                        fill="#8B96A5"
                      />
                    </svg>
                    <span className="whitespace-nowrap">
                      {"  "}
                      {product.sold} sold
                    </span>
                  </div>
                </div>
                <div className={`flex flex-col gap-2 mt-5`}>
                  <div>
                    <span className="text-[#8B96A5] text-base font-extralight">
                      Price:{` `}
                    </span>
                    <span className="text-[#505050] text-base font-normal">
                      {product.priceAfterDiscount
                        ? EGP.format(product.priceAfterDiscount)
                        : EGP.format(product.price)}
                    </span>
                  </div>
                  {product.priceAfterDiscount && (
                    <div>
                      <span className="text-[#8B96A5] text-base font-extralight">
                        Discount:{` `}
                      </span>
                      <span className="text-[#505050] text-base font-normal">
                        {normalNumber.format(
                          Math.round(
                            ((product.price - product?.priceAfterDiscount) /
                              product.price) *
                              100
                          )
                        )}
                        %
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-[#8B96A5] text-base font-extralight">
                      Quantity:{` `}
                    </span>
                    <span className="text-[#505050] text-base font-normal">
                      {normalNumber.format(product.quantity)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8B96A5] text-base font-extralight">
                      Ratings Quantity:{` `}
                    </span>
                    <span className="text-[#505050] text-base font-normal">
                      {normalNumber.format(product.ratingsQuantity)}
                    </span>
                  </div>
                  {product.category && (
                    <div>
                      <span className="text-[#8B96A5] text-base font-extralight">
                        Category:{` `}
                      </span>
                      <span className="text-[#505050] text-base font-normal">
                        {product.category.name}
                      </span>
                    </div>
                  )}
                  {colors.length > 0 && (
                    <div className="flex">
                      <span className="text-[#8B96A5] text-base font-extralight">
                        Colors:{` `}
                      </span>
                      <div className="text-[#505050] text-base font-normal">
                        {colors.map((singleColor) => (
                          <span
                            onClick={() => setChooseColor(singleColor)}
                            key={singleColor + `${Math.random()}`}
                            style={{ background: "#" + singleColor }}
                            className={`px-3 cursor-pointer py-1 mx-1 rounded-full `}
                          ></span>
                        ))}
                        {chooseColor&&<button
                          onClick={() => setChooseColor("")}
                          className={`text-xs text-red-400 -rotate-3 ms-2`}
                        >
                          remove
                        </button>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Add Cart */}
              <Cart productId={product._id} color={chooseColor} />
            </div>
          </div>
          {/* End Product */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-5`}>
            {/* Description */}
            <div className={` bg-[#FFF] p-3 rounded-lg col-span-2 border`}>
              {/* headre */}
              <div className={`flex gap-5 `}>
                {["Description", "Reviews", "Shipping"].map((titleHeade) => (
                  <div
                    key={titleHeade}
                    className={`flex flex-col hover:border-b-2 hover:border-b-[#0D6EFD] hover:text-[#0D6EFD] p-1 rounded-lg`}
                  >
                    <button
                      key={titleHeade}
                      className={`p-0 m-0`}
                      onClick={() => setcontentDescription(titleHeade)}
                    >
                      {titleHeade}
                    </button>
                  </div>
                ))}
              </div>
              {/* content */}
              <div className={`mt-5`}>
                {contentDescription === "Description" ? (
                  <p>{product.description}</p>
                ) : contentDescription === "Reviews" ? (
                  <div className={`flex flex-col gap-5`}>
                    {reviews.length < 15
                      ? reviews.map((review) => {
                          return getCookios._id !== review.user._id ? (
                            <div
                              key={review._id}
                              className={`flex flex-col gap-1 justify-start `}
                            >
                              <div className={`flex `}>
                                <span
                                  className={`rounded-lg text-center p-2 bg-[#C6F3F1] text-[#4CA7A7] `}
                                >
                                  {review.user.name[0].toUpperCase()}
                                </span>
                                <span
                                  className={`text-[#1C1C1C] mx-2 text-base font-normal`}
                                >
                                  {review.user.name}
                                </span>
                                <Rating
                                  name="read-only"
                                  value={review.rating}
                                  readOnly
                                />
                              </div>
                              <div className={`ms-5 flex gap-5 justify-around`}>
                                <span
                                  className={`text-[#2a2929] text-base font-medium`}
                                >
                                  {review.reviewText}
                                </span>
                                <StyledRating
                                  className={``}
                                  name="highlight-selected-only"
                                  defaultValue={2}
                                  IconContainerComponent={IconContainer}
                                  getLabelText={(value) =>
                                    customIcons[value].label
                                  }
                                  highlightSelectedOnly
                                />
                              </div>
                            </div>
                          ) : (
                            <div
                              key={review._id}
                              className={`flex flex-col gap-1 justify-start `}
                            >
                              <div className={`flex `}>
                                <span
                                  className={`rounded-lg text-center p-2 bg-[#C6F3F1] text-[#4CA7A7] `}
                                >
                                  {review.user.name[0].toUpperCase()}
                                </span>
                                <span
                                  className={`text-[#1C1C1C] mx-2 text-base font-normal`}
                                >
                                  {review.user.name}
                                </span>
                                <Rating
                                  name="read-only"
                                  value={
                                    changedupdateRatingReview
                                      ? +updateRatingReview
                                      : review.rating
                                  }
                                  onChange={(e) => {
                                    setChangedUpdateRatingReview(true);
                                    setUpdateRatingReview(e.target.value);
                                  }}
                                />
                              </div>
                              <div
                                className={`ms-5 flex gap-5  justify-around`}
                              >
                                <input
                                  ref={inputReviewUpdate}
                                  // disabled={typeInputUpdateReview}
                                  defaultValue={review.reviewText}
                                  className={`text-[#2a2929] px-2 rounded-lg text-base font-medium`}
                                  onChange={(e) =>
                                    setUpdateTextreview(e.target.value)
                                  }
                                />
                                <div className="flex gap-3">
                                  {updateTextReview !== "" && (
                                    <button
                                      onClick={(e) =>
                                        updateReview(
                                          e,
                                          review._id,
                                          review.rating
                                        )
                                      }
                                      className="p-2 rounded-lg bg-[#89769f] hover:bg-[#977cb9]"
                                    >
                                      <UpdateIcon />
                                    </button>
                                  )}
                                  {updateTextReview === "" && (
                                    <button
                                      onClick={handleUpdateReview}
                                      className="p-2 rounded-lg bg-[#89769f] hover:bg-[#977cb9]"
                                    >
                                      <EditNoteIcon />
                                    </button>
                                  )}
                                  <button
                                    onClick={(e) =>
                                      handleDeleteReview(e, review._id)
                                    }
                                    className="p-2 rounded-lg bg-red-200 hover:bg-red-300"
                                  >
                                    <DeleteForeverIcon />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : showReviews === "show"
                      ? reviews.map((review) => {
                          return getCookios._id !== review.user._id ? (
                            <div
                              key={review._id}
                              className={`flex flex-col gap-1 justify-start `}
                            >
                              <div className={`flex `}>
                                <span
                                  className={`rounded-lg text-center p-2 bg-[#C6F3F1] text-[#4CA7A7] `}
                                >
                                  {review.user.name[0].toUpperCase()}
                                </span>
                                <span
                                  className={`text-[#1C1C1C] mx-2 text-base font-normal`}
                                >
                                  {review.user.name}
                                </span>
                                <Rating
                                  name="read-only"
                                  value={review.rating}
                                  readOnly
                                />
                              </div>
                              <div className={`ms-5 flex gap-5 justify-around`}>
                                <span
                                  className={`text-[#2a2929] text-base font-medium`}
                                >
                                  {review.reviewText}
                                </span>
                                <StyledRating
                                  className={``}
                                  name="highlight-selected-only"
                                  defaultValue={2}
                                  IconContainerComponent={IconContainer}
                                  getLabelText={(value) =>
                                    customIcons[value].label
                                  }
                                  highlightSelectedOnly
                                />
                              </div>
                            </div>
                          ) : (
                            <div
                              key={review._id}
                              className={`flex flex-col gap-1 justify-start `}
                            >
                              <div className={`flex `}>
                                <span
                                  className={`rounded-lg text-center p-2 bg-[#C6F3F1] text-[#4CA7A7] `}
                                >
                                  {review.user.name[0].toUpperCase()}
                                </span>
                                <span
                                  className={`text-[#1C1C1C] mx-2 text-base font-normal`}
                                >
                                  {review.user.name}
                                </span>
                                <Rating
                                  name="read-only"
                                  value={
                                    changedupdateRatingReview
                                      ? updateRatingReview
                                      : review.rating
                                  }
                                  onChange={(e) => {
                                    setChangedUpdateRatingReview(true);
                                    setUpdateRatingReview(e.target.value);
                                  }}
                                />
                              </div>
                              <div
                                className={`ms-5 flex gap-5  justify-around`}
                              >
                                <input
                                  ref={inputReviewUpdate}
                                  // disabled={typeInputUpdateReview}
                                  defaultValue={review.reviewText}
                                  className={`text-[#2a2929] px-2 rounded-lg text-base font-medium`}
                                  onChange={(e) =>
                                    setUpdateTextreview(e.target.value)
                                  }
                                />
                                <div className="flex gap-3">
                                  {updateTextReview !== "" && (
                                    <button
                                      onClick={(e) =>
                                        updateReview(
                                          e,
                                          review._id,
                                          review.rating
                                        )
                                      }
                                      className="p-2 rounded-lg bg-[#89769f] hover:bg-[#977cb9]"
                                    >
                                      <UpdateIcon />
                                    </button>
                                  )}
                                  {updateTextReview === "" && (
                                    <button
                                      onClick={handleUpdateReview}
                                      className="p-2 rounded-lg bg-[#89769f] hover:bg-[#977cb9]"
                                    >
                                      <EditNoteIcon />
                                    </button>
                                  )}
                                  <button
                                    onClick={(e) =>
                                      handleDeleteReview(e, review._id)
                                    }
                                    className="p-2 rounded-lg bg-red-200 hover:bg-red-300"
                                  >
                                    <DeleteForeverIcon />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : reviews.slice(0, 4).map((review) => {
                          return getCookios._id !== review.user._id ? (
                            <div
                              key={review._id}
                              className={`flex flex-col gap-1 justify-start `}
                            >
                              <div className={`flex `}>
                                <span
                                  className={`rounded-lg text-center p-2 bg-[#C6F3F1] text-[#4CA7A7] `}
                                >
                                  {review.user.name[0].toUpperCase()}
                                </span>
                                <span
                                  className={`text-[#1C1C1C] mx-2 text-base font-normal`}
                                >
                                  {review.user.name}
                                </span>
                                <Rating
                                  name="read-only"
                                  value={review.rating}
                                  readOnly
                                />
                              </div>
                              <div className={`ms-5 flex gap-5 justify-around`}>
                                <span
                                  className={`text-[#2a2929] text-base font-medium`}
                                >
                                  {review.reviewText}
                                </span>
                                <StyledRating
                                  className={``}
                                  name="highlight-selected-only"
                                  defaultValue={2}
                                  IconContainerComponent={IconContainer}
                                  getLabelText={(value) =>
                                    customIcons[value].label
                                  }
                                  highlightSelectedOnly
                                />
                              </div>
                            </div>
                          ) : (
                            <div
                              key={review._id}
                              className={`flex flex-col gap-1 justify-start `}
                            >
                              <div className={`flex `}>
                                <span
                                  className={`rounded-lg text-center p-2 bg-[#C6F3F1] text-[#4CA7A7] `}
                                >
                                  {review.user.name[0].toUpperCase()}
                                </span>
                                <span
                                  className={`text-[#1C1C1C] mx-2 text-base font-normal`}
                                >
                                  {review.user.name}
                                </span>
                                <Rating
                                  name="read-only"
                                  value={
                                    changedupdateRatingReview
                                      ? updateRatingReview
                                      : review.rating
                                  }
                                  onChange={(e) => {
                                    setChangedUpdateRatingReview(true);
                                    setUpdateRatingReview(e.target.value);
                                  }}
                                />
                              </div>
                              <div
                                className={`ms-5 flex gap-5  justify-around`}
                              >
                                <input
                                  ref={inputReviewUpdate}
                                  // disabled={typeInputUpdateReview}
                                  defaultValue={review.reviewText}
                                  className={`text-[#2a2929] px-2 rounded-lg text-base font-medium`}
                                  onChange={(e) =>
                                    setUpdateTextreview(e.target.value)
                                  }
                                />
                                <div className="flex gap-3">
                                  {updateTextReview !== "" && (
                                    <button
                                      onClick={(e) =>
                                        updateReview(
                                          e,
                                          review._id,
                                          review.rating
                                        )
                                      }
                                      className="p-2 rounded-lg bg-[#89769f] hover:bg-[#977cb9]"
                                    >
                                      <UpdateIcon />
                                    </button>
                                  )}
                                  {updateTextReview === "" && (
                                    <button
                                      onClick={handleUpdateReview}
                                      className="p-2 rounded-lg bg-[#89769f] hover:bg-[#977cb9]"
                                    >
                                      <EditNoteIcon />
                                    </button>
                                  )}
                                  <button
                                    onClick={(e) =>
                                      handleDeleteReview(e, review._id)
                                    }
                                    className="p-2 rounded-lg bg-red-200 hover:bg-red-300"
                                  >
                                    <DeleteForeverIcon />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    {reviews.length > 15 && (
                      <button
                        onClick={() => {
                          if (showReviews === "hide") {
                            setshowReviews("show");
                          } else {
                            setshowReviews("hide");
                          }
                        }}
                        className="flex justify-around bg-slate-200 hover:bg-slate-300 rounded-lg"
                      >
                        <span className={`text-start `}>
                          {showReviews} all reviews
                        </span>
                        {showReviews === "hide" ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </button>
                    )}
                    {/* Add user logged review */}
                    {cookies.token !== undefined && !userLoggedHaveReview && (
                      <div className={`flex gap-4`}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Text Review"
                          multiline
                          rows={4}
                          onChange={(e) => {
                            setTextReview(e.target.value);
                            setHandleErrorAddReview("");
                          }}
                        />
                        <div className={`flex flex-col justify-around`}>
                          <Rating
                            name="simple-controlled"
                            value={ratingReview}
                            onChange={(event, newValue) => {
                              setRatingReview(newValue);
                              setHandleErrorAddReview("");
                            }}
                          />
                          <button
                            onClick={handleAddReview}
                            type={`submit`}
                            className={`bg-[#0D6EFD] text-white p-1 rounded-lg`}
                          >
                            Add Review
                          </button>
                        </div>
                      </div>
                    )}
                    <div
                      className={`bg-red-200 ${
                        handleErrorAddReview !== "" && "p-2"
                      } rounded-lg text-center`}
                    >
                      {handleErrorAddReview}
                    </div>
                  </div>
                ) : (
                  "null"
                )}
              </div>
            </div>
            {/* You may like */}
            {wishlistStateDate.length > 0 && (
              <div className={`border rounded-lg p-3 bg-[#FFF]`}>
                <h3
                  className={`text-[#1C1C1C] text-base font-semibold text-start`}
                >
                  You may like
                </h3>
                <div className={`grid grid-cols-1 gap-4`}>
                  {wishlistStateDate
                    .slice(0, 4)
                    .map(
                      ({
                        _id,
                        title,
                        description,
                        quantity,
                        imageCover,
                        price,
                        priceAfterDiscount = false,
                        product,
                      }) => (
                        <Link
                          key={_id}
                          to={`/products/${_id}`}
                          className={`flex items-start gap-3 mt-3`}
                        >
                          <img
                            className={`border p-2 rounded-lg w-20  `}
                            src={imageCover}
                            alt={title}
                          />
                          <div>
                            <h5
                              className={`text-[#1C1C1C] text-base font-normal`}
                            >
                              {title.length > 20 ? `${title}...` : title}
                            </h5>
                            <span
                              className={`text-[#8B96A5] text-base font-normal`}
                            >
                              {priceAfterDiscount
                                ? `${EGP.format(
                                    priceAfterDiscount
                                  )} - <del>${EGP.format(price)}</del>`
                                : `${EGP.format(price)}`}
                            </span>
                          </div>
                        </Link>
                      )
                    )}
                </div>
              </div>
            )}
          </div>
        </div>
        <DiscountOf100 />
      </Container>
      <RelatedProducts
        categoryId={product.category._id}
        productId={product._id}
      />
      <Footer />
      <Copyright />
    </ThemeProvider>
  );
}

export default SingleProducts;
