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
        const checkUserReivew = res.data.reviews.find(review => review.user._id === getCookios._id) // check if user logged have a reivew
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
  function setImg(size) {
    return setSizeImage(size);
  }
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
                  onClick={() => setImg("50%")}
                  className={`text-sm font-semibold border rounded-lg px-2 hover:bg-slate-300 `}
                >
                  Small
                </button>
                <button
                  onClick={() => setImg("70%")}
                  className={`text-sm font-semibold border rounded-lg px-2 hover:bg-slate-300 mx-2`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setImg("100%")}
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
                    <img src={product.imageCover} alt={product.title} />
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
                            key={singleColor + `${Math.random()}`}
                            style={{ background: "#" + singleColor }}
                            className={`px-3 py-1 mx-1 rounded-full `}
                          ></span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Add Cart */}
              <div className="mt-5">
                {/* title name */}
                <div>
                  <div>
                    {" "}
                    {getCookios.token === undefined ? (
                      <div
                        className={`bg-[#E3F0FF] rounded-lg p-5 flex flex-col gap-2 `}
                      >
                        <div className={`flex gap-2 items-center`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="44"
                            height="44"
                            viewBox="0 0 44 44"
                            fill="none"
                          >
                            <path
                              d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z"
                              fill="#C7E1FF"
                            />

                            <g mask="url(#mask0_235_4822)">
                              <path
                                d="M17.1512 33.8012L11.3456 36.9234C11.0049 37.1065 8.31186 38.1996 8.02698 38.445C13.4142 42.5016 18.1688 43.4054 22.9428 43.4054C27.6815 43.4054 32.895 40.8254 36.2702 38.05C35.9589 37.7908 34.7485 37.1485 34.3741 36.9647L28.1573 33.9004C27.3541 33.5044 26.8467 32.6951 26.8467 31.8097V29.4049C27.0215 29.2088 27.2212 28.9568 27.4348 28.6593C28.2821 27.4794 28.9231 26.1814 29.3673 24.8197C30.1647 24.5772 30.7521 23.8512 30.7521 22.9883V20.4213C30.7521 19.8567 30.4973 19.3521 30.1016 18.9988V15.2881C30.1016 15.2881 30.8747 9.51355 22.9428 9.51355C15.0109 9.51355 15.784 15.2881 15.784 15.2881V18.9988C15.3876 19.3521 15.1335 19.8567 15.1335 20.4213V22.9883C15.1335 23.6644 15.494 24.2594 16.0337 24.6033C16.6842 27.3954 18.3876 29.4049 18.3876 29.4049V31.7504C18.3869 32.6046 17.9126 33.3915 17.1512 33.8012Z"
                                fill="white"
                              />
                            </g>
                          </svg>
                          <p className="font-normal text-lg ">
                            Hi, user let’s get stated
                          </p>
                        </div>
                        <Link
                          className={`rounded-lg px-5 py-2 bg-gradient-to-l whitespace-nowrap text-[#FFF] from-[#127FFF] to-[#0067FF] text-center`}
                          to={"/auth/sign-up"}
                        >
                          Join now
                        </Link>
                        <Link
                          className={`rounded-lg px-5 py-2  bg-[#FFF] border-1 border-[#DEE2E7] text-[#0D6EFD] text-center`}
                          to={"/auth/sign-in"}
                        >
                          Log in
                        </Link>
                      </div>
                    ) : (
                      <div
                        className={`bg-[#FFF] border-2 rounded-lg p-5 flex flex-col gap-2 `}
                      >
                        <div className={`flex gap-2 items-center`}>
                          <div className={`mb-2`}>
                            {fullNameMain !== "" ? (
                              userImgMain === "" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="44"
                                  height="44"
                                  viewBox="0 0 44 44"
                                  fill="none"
                                >
                                  <path
                                    d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z"
                                    fill="#BDC4CD"
                                  />
                                  <mask
                                    id="mask0_265_4058"
                                    maskUnits="userSpaceOnUse"
                                    x="0"
                                    y="0"
                                    width="44"
                                    height="44"
                                  >
                                    <path
                                      d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z"
                                      fill="white"
                                    />
                                  </mask>
                                  <g mask="url(#mask0_265_4058)">
                                    <path
                                      d="M17.1515 33.8011L11.346 36.9233C11.0053 37.1064 8.31223 38.1994 8.02734 38.4449C13.4146 42.5015 18.1692 43.4053 22.9432 43.4053C27.6819 43.4053 32.8953 40.8253 36.2706 38.0499C35.9593 37.7907 34.7489 37.1484 34.3744 36.9645L28.1577 33.9003C27.3544 33.5043 26.8471 32.695 26.8471 31.8096V29.4048C27.0218 29.2086 27.2215 28.9567 27.4352 28.6592C28.2825 27.4792 28.9235 26.1813 29.3677 24.8196C30.1651 24.5771 30.7525 23.851 30.7525 22.9881V20.4212C30.7525 19.8565 30.4977 19.352 30.1019 18.9987V15.288C30.1019 15.288 30.8751 9.51343 22.9432 9.51343C15.0113 9.51343 15.7844 15.288 15.7844 15.288V18.9987C15.3879 19.352 15.1339 19.8565 15.1339 20.4212V22.9881C15.1339 23.6643 15.4944 24.2593 16.034 24.6032C16.6846 27.3953 18.388 29.4048 18.388 29.4048V31.7503C18.3873 32.6045 17.9129 33.3913 17.1515 33.8011Z"
                                      fill="#DEE2E7"
                                    />
                                  </g>
                                </svg>
                              ) : (
                                <img
                                  src={userImgMain}
                                  className={`rounded-full w-16`}
                                  alt={fullNameMain + "-user"}
                                />
                              )
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="44"
                                height="44"
                                viewBox="0 0 44 44"
                                fill="none"
                              >
                                <path
                                  d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z"
                                  fill="#BDC4CD"
                                />
                                <mask
                                  id="mask0_265_4058"
                                  maskUnits="userSpaceOnUse"
                                  x="0"
                                  y="0"
                                  width="44"
                                  height="44"
                                >
                                  <path
                                    d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z"
                                    fill="white"
                                  />
                                </mask>
                                <g mask="url(#mask0_265_4058)">
                                  <path
                                    d="M17.1515 33.8011L11.346 36.9233C11.0053 37.1064 8.31223 38.1994 8.02734 38.4449C13.4146 42.5015 18.1692 43.4053 22.9432 43.4053C27.6819 43.4053 32.8953 40.8253 36.2706 38.0499C35.9593 37.7907 34.7489 37.1484 34.3744 36.9645L28.1577 33.9003C27.3544 33.5043 26.8471 32.695 26.8471 31.8096V29.4048C27.0218 29.2086 27.2215 28.9567 27.4352 28.6592C28.2825 27.4792 28.9235 26.1813 29.3677 24.8196C30.1651 24.5771 30.7525 23.851 30.7525 22.9881V20.4212C30.7525 19.8565 30.4977 19.352 30.1019 18.9987V15.288C30.1019 15.288 30.8751 9.51343 22.9432 9.51343C15.0113 9.51343 15.7844 15.288 15.7844 15.288V18.9987C15.3879 19.352 15.1339 19.8565 15.1339 20.4212V22.9881C15.1339 23.6643 15.4944 24.2593 16.034 24.6032C16.6846 27.3953 18.388 29.4048 18.388 29.4048V31.7503C18.3873 32.6045 17.9129 33.3913 17.1515 33.8011Z"
                                    fill="#DEE2E7"
                                  />
                                </g>
                              </svg>
                            )}
                          </div>
                          <p className="font-normal text-lg ">
                            Hi, {`${getCookios.slug} `}
                          </p>
                        </div>
                        <div className={`border-t-2 py-3`}>
                          <div className={`flex items-center gap-1`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M10 0.833374L2.5 4.16671V9.16671C2.5 13.7917 5.7 18.1167 10 19.1667C14.3 18.1167 17.5 13.7917 17.5 9.16671V4.16671L10 0.833374ZM15.8333 9.16671C15.8333 12.9334 13.35 16.4084 10 17.4417C6.65 16.4084 4.16667 12.9334 4.16667 9.16671V5.25004L10 2.65837L15.8333 5.25004V9.16671ZM6.175 9.65837L5 10.8334L8.33333 14.1667L15 7.50004L13.825 6.31671L8.33333 11.8084L6.175 9.65837Z"
                                fill="#8B96A5"
                              />
                            </svg>
                            <span
                              className={`text-[#8B96A5] text-base font-normal`}
                            >
                              Verified Seller
                            </span>
                          </div>
                          <div className={`flex items-center gap-1`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M9.9915 1.66663C5.3915 1.66663 1.6665 5.39996 1.6665 9.99996C1.6665 14.6 5.3915 18.3333 9.9915 18.3333C14.5998 18.3333 18.3332 14.6 18.3332 9.99996C18.3332 5.39996 14.5998 1.66663 9.9915 1.66663ZM15.7665 6.66663H13.3082C13.0415 5.62496 12.6582 4.62496 12.1582 3.69996C13.6915 4.22496 14.9665 5.29163 15.7665 6.66663ZM9.99984 3.36663C10.6915 4.36663 11.2332 5.47496 11.5915 6.66663H8.40817C8.7665 5.47496 9.30817 4.36663 9.99984 3.36663ZM3.54984 11.6666C3.4165 11.1333 3.33317 10.575 3.33317 9.99996C3.33317 9.42496 3.4165 8.86663 3.54984 8.33329H6.3665C6.29984 8.88329 6.24984 9.43329 6.24984 9.99996C6.24984 10.5666 6.29984 11.1166 6.3665 11.6666H3.54984ZM4.23317 13.3333H6.6915C6.95817 14.375 7.3415 15.375 7.8415 16.3C6.30817 15.775 5.03317 14.7166 4.23317 13.3333ZM6.6915 6.66663H4.23317C5.03317 5.28329 6.30817 4.22496 7.8415 3.69996C7.3415 4.62496 6.95817 5.62496 6.6915 6.66663ZM9.99984 16.6333C9.30817 15.6333 8.7665 14.525 8.40817 13.3333H11.5915C11.2332 14.525 10.6915 15.6333 9.99984 16.6333ZM11.9498 11.6666H8.04984C7.97484 11.1166 7.9165 10.5666 7.9165 9.99996C7.9165 9.43329 7.97484 8.87496 8.04984 8.33329H11.9498C12.0248 8.87496 12.0832 9.43329 12.0832 9.99996C12.0832 10.5666 12.0248 11.1166 11.9498 11.6666ZM12.1582 16.3C12.6582 15.375 13.0415 14.375 13.3082 13.3333H15.7665C14.9665 14.7083 13.6915 15.775 12.1582 16.3ZM13.6332 11.6666C13.6998 11.1166 13.7498 10.5666 13.7498 9.99996C13.7498 9.43329 13.6998 8.88329 13.6332 8.33329H16.4498C16.5832 8.86663 16.6665 9.42496 16.6665 9.99996C16.6665 10.575 16.5832 11.1333 16.4498 11.6666H13.6332Z"
                                fill="#8B96A5"
                              />
                            </svg>
                            <span
                              className={`text-[#8B96A5] text-base font-normal`}
                            >
                              Worldwide shipping
                            </span>
                          </div>
                        </div>
                        <button
                          className={`rounded-lg px-5 py-2 bg-gradient-to-l whitespace-nowrap text-[#FFF] from-[#127FFF] to-[#0067FF] text-center`}
                        >
                          add to cart
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
                    {cookies.token !== undefined &&
                      !userLoggedHaveReview && (
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
                          )
                      }
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
                      }) => (
                        <Link
                          key={_id}
                          to={`/favorites`}
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
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default SingleProducts;
