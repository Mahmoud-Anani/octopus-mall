import React, { useRef } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// AXIOS
import axios from "axios";
// STATES
import {
  loadingState,
  mainProductsState,
  products,
  sideShowState,
  storeCategorys,
  keywordSearchState,
} from "../../store/ViewProductHome";
import productIcon from "./../../assets/products/product-icon.png";
// Cookies
import { useCookies } from "react-cookie";
// UI Components MUI
// import Modal from "@mui/material/Modal";
import {
  Box,
  Container,
  CssBaseline,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
// UI Statemant
import Copyright from "../Copyright";
import Logo from "../Logo";
import { filterCategory } from "../../store/FiltersStore";

// FUNC Sign-Out
 

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

// const VITE_LIMITPRODUCTS = 10000;

// let categorySearchId = "";
// let keywordSearch = "";
let searchKeywordMubile = "";

let fullNameMain = "";
let userImgMain = "";

// Handle user icon
function changeUserIcon() {
  return (
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
  );
}

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const locationRouter = useLocation();

  const [loading, setloading] = useRecoilState(loadingState);

  // const [keywordSearch, setKeywordSearch] = React.useState("");
  const [producs, setProducts] = useRecoilState(products);
  const [mainProducts, setmainProducts] = useRecoilState(mainProductsState);
  // console.log(producs);
  const getMainProducts = async () =>
    await axios
      .get(
        `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/products?limit=${
          import.meta.env.VITE_LIMITPRODUCTS || 10000
        }`
      )
      .then((res) => {
        const data = res.data;
        setmainProducts(data.data);
      });

  // Get Poducts
  const [keywordSearch, setkeywordSearchState] =
    useRecoilState(keywordSearchState);

  const [categorySearchId, setcategorySearchId] =
    useRecoilState(filterCategory);

  const getProducts = async () => {
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
          setProducts(data.data);
        });
    } else if (categorySearchId === "" && keywordSearch !== "") {
      // Get products by only keyword
      return await axios
        .get(
          `${
            import.meta.env.VITE_DOMAIN_NAME
          }/api/v1/products?keyword=${keywordSearch}&limit=${
            import.meta.env.VITE_LIMITPRODUCTS || 10000
          }`
        )
        .then((res) => {
          const data = res.data;
          setProducts(data.data);
        });
    } else if (categorySearchId !== "" && keywordSearch !== "") {
      // Get products by category and keyword
      return await axios
        .get(
          `${
            import.meta.env.VITE_DOMAIN_NAME
          }/api/v1/products?keyword=${keywordSearch}&category=${categorySearchId}&limit=${
            import.meta.env.VITE_LIMITPRODUCTS || 10000
          }`
        )
        .then((res) => {
          const data = res.data;
          setProducts(data.data);
        });
    } else {
      // Get products
      return await axios
        .get(
          `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/products?limit=${
            import.meta.env.VITE_LIMITPRODUCTS || 10000
          }`
        )
        .then((res) => {
          const data = res.data;
          setProducts(data.data);
        });
    }
  };

  // Get Categorys
  // const [categorys, setcategorys] = React.useState([]);
  const [categorys, setcategorys] = useRecoilState(storeCategorys);
  const getCategorys = async () => {
    return await axios
      .get(`${import.meta.env.VITE_DOMAIN_NAME}/api/v1/category?limit=100`)
      .then((res) => {
        const data = res.data;
        setcategorys(data.data);
      });
  };

  // handle auth user
  const [getCookios, setCookies] = useCookies([
    "token",
    "slug",
    "userImg",
    "role",
    "_id",
  ]);
function actionSignOut() {
  // remove cookie name token
  setCookies("token", "", { expires: new Date(0), path: "/" });
  setCookies("role", "", { expires: new Date(0), path: "/" });
  setCookies("slug", "", {
    expires: new Date(0),
    path: "/",
  });
  setCookies("userImg", "", { expires: new Date(0), path: "/" });
  setCookies("_id", "", { expires: new Date(0), path: "/" });
  navigate("/auth/sign-in");
}
  const [fullUserName, setfullUserName] = React.useState("");
  React.useEffect(() => {
    getCategorys();
    getProducts();
    getMainProducts();
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
  }, [getCookios.slug, getCookios.token]);

  // Test fullUserName and user data
  // console.log('fullUserName',fullUserName);

  // test is product get!!
  // console.log(producs);

  // Handle select category
  const [categorySearch, setCategorySearch] = React.useState("");

  const handleChangeCatigorySearch = (e) => {
    setCategorySearch(e.target.value);
    setcategorySearchId(e.target.value);
  };

  // handle form

  const handleSubmit = (e) => {
    if (searchKeywordMubile === "") {
      e?.preventDefault();
      const dataForm = new FormData(e?.currentTarget);
      const dataSearch = {
        keyword: dataForm.get("keyword"),
      };
      setkeywordSearchState(dataSearch.keyword);
    }
    setkeywordSearchState(searchKeywordMubile);
    getProducts();
  };
  // handle side bar
  const [sideShow, setsideShow] = useRecoilState(sideShowState);
  // const [sideShow, setsideShow] = React.useState("-left-full");
  // controls on routes
  const navigate = useNavigate();

  // move pages in mubile phone
  function movePage(route) {
    navigate(route);
    setsideShow("left-full");
    return true;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <nav
        id="refSideNav"
        className={`${
          loading ? "hidden" : "flex"
        }  items-center  flex-wrap justify-between py-3 gap-5 sticky top-0 z-50 bg-[#FFF] px-5`}
      >
        {/* sidbar mubile */}
        {
          <div
            className={` flex fixed  top-0 overflow-scroll h-[100%]  ${sideShow} ${
              sideShow === "-left-full" && "hidden"
            } z-50 w-full  `}
          >
            <div className={`w-[80%]  bg-[#FFF]`}>
              <Logo />
              {/* Header Sidebar */}
              <div>
                {/* Content Header Sidebar */}
                <div className={`py-1 px-8 bg-[#EFF2F4]`}>
                  {changeUserIcon()}
                  <div className="">
                    <span>
                      {getCookios.slug ? (
                        fullUserName
                      ) : (
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              movePage("/auth/sign-in");
                            }}
                          >
                            Sign in
                          </button>
                          |
                          <button
                            onClick={() => {
                              movePage("/auth/sign-up");
                            }}
                          >
                            Register
                          </button>
                        </div>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              {/* First Section Sidebar */}
              <Box
                sx={{
                  width: "100%",
                  margin: "0px ",
                  bgcolor: "background.paper",
                }}
              >
                <nav aria-label="main mailbox folders">
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => movePage("/")}>
                        <ListItemIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 6.19L17 10.69V18.5H15V12.5H9V18.5H7V10.69L12 6.19ZM12 3.5L2 12.5H5V20.5H11V14.5H13V20.5H19V12.5H22L12 3.5Z"
                              fill="#8B96A5"
                            />
                          </svg>
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => movePage("/products")}>
                        <ListItemIcon>
                          <img
                            className={`w-7`}
                            src={productIcon}
                            alt="product icon"
                          />
                        </ListItemIcon>
                        <ListItemText primary="Products" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => movePage("/protofil")}>
                        <ListItemIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="19"
                            viewBox="0 0 20 19"
                            fill="none"
                          >
                            <path
                              d="M10 10C12.7625 10 15 7.7625 15 5C15 2.2375 12.7625 0 10 0C7.2375 0 5 2.2375 5 5C5 7.7625 7.2375 10 10 10ZM10 11.5C6.6625 11.5 0 13.175 0 16.5V17.75C0 18.4375 0.5625 19 1.25 19H18.75C19.4375 19 20 18.4375 20 17.75V16.5C20 13.175 13.3375 11.5 10 11.5Z"
                              fill="#8B96A5"
                            />
                          </svg>
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => movePage("/message")}>
                        <ListItemIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M18 0H2C0.9 0 0.01 0.9 0.01 2L0 20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM5 7H15C15.55 7 16 7.45 16 8C16 8.55 15.55 9 15 9H5C4.45 9 4 8.55 4 8C4 7.45 4.45 7 5 7ZM11 12H5C4.45 12 4 11.55 4 11C4 10.45 4.45 10 5 10H11C11.55 10 12 10.45 12 11C12 11.55 11.55 12 11 12ZM15 6H5C4.45 6 4 5.55 4 5C4 4.45 4.45 4 5 4H15C15.55 4 16 4.45 16 5C16 5.55 15.55 6 15 6Z"
                              fill="#8B96A5"
                            />
                          </svg>
                        </ListItemIcon>
                        <ListItemText primary="Message" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => movePage("/categories")}>
                        <ListItemIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M4.25 10.5C3.42 10.5 2.75 11.17 2.75 12C2.75 12.83 3.42 13.5 4.25 13.5C5.08 13.5 5.75 12.83 5.75 12C5.75 11.17 5.08 10.5 4.25 10.5ZM4.25 4.5C3.42 4.5 2.75 5.17 2.75 6C2.75 6.83 3.42 7.5 4.25 7.5C5.08 7.5 5.75 6.83 5.75 6C5.75 5.17 5.08 4.5 4.25 4.5ZM4.25 16.5C3.42 16.5 2.75 17.18 2.75 18C2.75 18.82 3.43 19.5 4.25 19.5C5.07 19.5 5.75 18.82 5.75 18C5.75 17.18 5.08 16.5 4.25 16.5ZM7.25 19H21.25V17H7.25V19ZM7.25 13H21.25V11H7.25V13ZM7.25 5V7H21.25V5H7.25Z"
                              fill="#8B96A5"
                            />
                          </svg>
                        </ListItemIcon>
                        <ListItemText primary="Categories" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => movePage("/favorites")}>
                        <ListItemIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M16.5 2.82495C14.76 2.82495 13.09 3.63495 12 4.91495C10.91 3.63495 9.24 2.82495 7.5 2.82495C4.42 2.82495 2 5.24495 2 8.32495C2 12.105 5.4 15.185 10.55 19.865L12 21.175L13.45 19.855C18.6 15.185 22 12.105 22 8.32495C22 5.24495 19.58 2.82495 16.5 2.82495ZM12.1 18.375L12 18.475L11.9 18.375C7.14 14.065 4 11.215 4 8.32495C4 6.32495 5.5 4.82495 7.5 4.82495C9.04 4.82495 10.54 5.81495 11.07 7.18495H12.94C13.46 5.81495 14.96 4.82495 16.5 4.82495C18.5 4.82495 20 6.32495 20 8.32495C20 11.215 16.86 14.065 12.1 18.375Z"
                              fill="#8B96A5"
                            />
                          </svg>
                        </ListItemIcon>
                        <ListItemText primary="Favorites" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => movePage("/cart")}>
                        <ListItemIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M20 2H4C3 2 2 2.9 2 4V7.01C2 7.73 2.43 8.35 3 8.7V20C3 21.1 4.1 22 5 22H19C19.9 22 21 21.1 21 20V8.7C21.57 8.35 22 7.73 22 7.01V4C22 2.9 21 2 20 2ZM19 20H5V9H19V20ZM20 7H4V4H20V7Z"
                              fill="#8B96A5"
                            />
                            <path d="M15 12H9V14H15V12Z" fill="#8B96A5" />
                          </svg>
                        </ListItemIcon>
                        <ListItemText primary="My Cart" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => movePage("/orders")}>
                        <ListItemIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="18"
                            viewBox="0 0 22 18"
                            fill="none"
                          >
                            <path
                              d="M12.35 17.1302C11.59 17.8202 10.42 17.8202 9.66003 17.1202L9.55003 17.0202C4.30003 12.2702 0.870031 9.16017 1.00003 5.28017C1.06003 3.58017 1.93003 1.95017 3.34003 0.990166C5.98003 -0.809834 9.24003 0.0301659 11 2.09017C12.76 0.0301659 16.02 -0.819834 18.66 0.990166C20.07 1.95017 20.94 3.58017 21 5.28017C21.14 9.16017 17.7 12.2702 12.45 17.0402L12.35 17.1302Z"
                              fill="#8B96A5"
                            />
                          </svg>
                        </ListItemIcon>
                        <ListItemText primary="My Orders" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </nav>
                <Divider />
                <nav aria-label="secondary mailbox folders">
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => movePage("/contact")}>
                        <ListItemIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M19 14V18H17V14H19ZM7 14V18H6C5.45 18 5 17.55 5 17V14H7ZM12 1C7.03 1 3 5.03 3 10V17C3 18.66 4.34 20 6 20H9V12H5V10C5 6.13 8.13 3 12 3C15.87 3 19 6.13 19 10V12H15V20H19V21H12V23H18C19.66 23 21 21.66 21 20V10C21 5.03 16.97 1 12 1Z"
                              fill="#8B96A5"
                            />
                          </svg>
                        </ListItemIcon>
                        <ListItemText primary="Contact us" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => movePage("/about")}>
                        <ListItemIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19ZM18 11H16V13H18V11ZM18 15H16V17H18V15Z"
                              fill="#8B96A5"
                            />
                          </svg>
                        </ListItemIcon>
                        <ListItemText primary="About" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                  <Divider />
                </nav>
                <nav aria-label="third mailbox folders">
                  <List>
                    <ListItemText
                      className="text-center"
                      primary="User agreement"
                    />
                    <ListItem disablePadding>
                      <ListItemText
                        className="text-center py-2"
                        primary="Partnership"
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        className="text-center"
                        primary="Privacy policy"
                      />
                    </ListItem>
                  </List>
                </nav>
                <Divider />
                <Copyright sx={{ mt: 2 }} />
              </Box>
            </div>
            <div
              onClick={() => {
                sideShow === "left-0"
                  ? setsideShow("-left-full")
                  : setsideShow("left-0");
              }}
              className={`bg-[#636363] w-[20%] `}
            ></div>
          </div>
        }

        {/* Logo */}
        <div className="flex gap-2 items-center ">
          <button
            className={`md:hidden block`}
            onClick={() => {
              sideShow === "left-0"
                ? setsideShow("-left-full")
                : setsideShow("left-0");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"
                fill="#1C1C1C"
              />
            </svg>
          </button>
          <Link className=" sm:flex hidden items-center" to={"/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
            >
              <g opacity="0.8">
                <path
                  d="M14.4674 1.91309H37.1848C40.9487 1.91309 44 5.28555 44 9.44569V34.5544C44 38.7145 40.9487 42.087 37.1848 42.087H14.4674C10.7034 42.087 7.65216 38.7145 7.65216 34.5544L7.65216 9.44569C7.65216 5.28555 10.7034 1.91309 14.4674 1.91309Z"
                  fill="#0D6EFD"
                />
                <path
                  d="M8.13044 1.91309H32.0435C36.0055 1.91309 39.2174 5.28555 39.2174 9.44569V34.5544C39.2174 38.7145 36.0055 42.087 32.0435 42.087H8.13044C4.1684 42.087 0.956527 38.7145 0.956528 34.5544L0.956528 9.44569C0.956527 5.28555 4.1684 1.91309 8.13044 1.91309Z"
                  fill="#0D6EFD"
                />
                <g opacity="0.7">
                  <path
                    opacity="0.3"
                    d="M15.2902 18.3562H14.3097C14.2591 18.3562 14.1842 18.4265 14.1813 18.473L13.4589 30.1476L26.9548 30.1451L26.2253 18.473C26.2225 18.4283 26.1457 18.3562 26.0969 18.3562H25.1164V20.3214C25.1164 20.8641 24.6765 21.3041 24.1338 21.3041C23.5911 21.3041 23.1512 20.8641 23.1512 20.3214V18.3562H17.2554V20.3214C17.2554 20.8641 16.8155 21.3041 16.2728 21.3041C15.7301 21.3041 15.2902 20.8641 15.2902 20.3214V18.3562Z"
                    fill="white"
                  />
                  <path
                    d="M20.2033 11.4783C22.9153 11.4783 25.1164 13.6796 25.1164 16.3891L26.0969 16.3914C27.1835 16.3914 28.1192 17.2704 28.1867 18.3508L28.9244 30.1539C28.9921 31.2361 28.1698 32.1133 27.0865 32.1133H13.3201C12.2374 32.1133 11.4146 31.2344 11.4821 30.1539L12.2198 18.3508C12.2875 17.2686 13.2213 16.3914 14.3096 16.3914H15.2902C15.2902 13.6781 17.493 11.4783 20.2033 11.4783ZM23.1511 16.3915C23.1511 14.765 21.8299 13.4436 20.2033 13.4436C18.5778 13.4436 17.2554 14.7642 17.2554 16.3892L23.1511 16.3915ZM15.2902 18.3566H14.3096C14.2591 18.3566 14.1842 18.4269 14.1813 18.4733L13.4589 30.148L26.9548 30.1455L26.2253 18.4733C26.2225 18.4286 26.1457 18.3566 26.0969 18.3566H25.1164V20.3218C25.1164 20.8645 24.6765 21.3044 24.1338 21.3044C23.5911 21.3044 23.1512 20.8645 23.1512 20.3218V18.3566H17.2554V20.3218C17.2554 20.8645 16.8155 21.3044 16.2728 21.3044C15.7301 21.3044 15.2902 20.8645 15.2902 20.3218V18.3566Z"
                    fill="white"
                  />
                </g>
              </g>
            </svg>
            <span className={`text-[#8CB7F5] text-2xl ms-2 `}>Brand</span>
          </Link>
        </div>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          className={`mx-auto`}
        >
          <div
            className={`sm:flex hidden  border-2 border-[#0D6EFD] rounded-lg `}
          >
            <input
              onChange={(e) => setkeywordSearchState(e.target.value)}
              id="keyword"
              label="Search"
              name="keyword"
              placeholder="🔍 Search"
              className={`max-h-[40px] rounded-lg px-3 focus:border-0 focus:outline-none lg:min-w-[30rem] placeholder:text-[#8B96A5]`}
            />
            <Select
              value={categorySearch}
              onChange={handleChangeCatigorySearch}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              style={{
                borderLeft: "#0D6EFD solid 2px",
                borderRadius: 0,
                fontSize: "1rem",
              }}
              className={`max-h-[40px] rounded-none border-s-2 border-[#0D6EFD]  `}
            >
              <MenuItem value="">
                <em>All Category</em>
              </MenuItem>
              {categorys.map((cat) => (
                <MenuItem value={cat._id} key={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
            <button
              type="submit"
              variant="contained"
              className="bg-gradient-to-l from-[#127FFF] to-[#0067FF] text-[#FFF] px-5 max-h-[40px] rounded-e-sm"
            >
              Search
            </button>
          </div>
          <div
            className={`flex sm:hidden  border-2 border-[#0D6EFD] rounded-lg `}
          >
            <input
              onChange={(e) => {
                if (e.target.value === "") {
                  getMainProducts();
                } else {
                  searchKeywordMubile = e.target.value;
                  handleSubmit();
                }
              }}
              id="keyword"
              label="Search"
              name="keyword"
              placeholder="🔍 Search"
              className={` rounded-lg p-1  focus:border-0 focus:outline-none  placeholder:text-[#8B96A5]`}
            />
          </div>
        </Box>
        {getCookios.role && (
          <div className={`sm:flex gap-5 mx-auto items-end hidden`}>
            {/* protofil */}
            <Link to={"/protofil"} className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
              >
                <path
                  d="M10 10C12.7625 10 15 7.7625 15 5C15 2.2375 12.7625 0 10 0C7.2375 0 5 2.2375 5 5C5 7.7625 7.2375 10 10 10ZM10 11.5C6.6625 11.5 0 13.175 0 16.5V17.75C0 18.4375 0.5625 19 1.25 19H18.75C19.4375 19 20 18.4375 20 17.75V16.5C20 13.175 13.3375 11.5 10 11.5Z"
                  fill="#8B96A5"
                />
              </svg>
              <span className={`text-xs`}>Profile</span>
            </Link>
            {/* Message */}
            <Link to={"/message"} className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M18 0H2C0.9 0 0.01 0.9 0.01 2L0 20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM5 7H15C15.55 7 16 7.45 16 8C16 8.55 15.55 9 15 9H5C4.45 9 4 8.55 4 8C4 7.45 4.45 7 5 7ZM11 12H5C4.45 12 4 11.55 4 11C4 10.45 4.45 10 5 10H11C11.55 10 12 10.45 12 11C12 11.55 11.55 12 11 12ZM15 6H5C4.45 6 4 5.55 4 5C4 4.45 4.45 4 5 4H15C15.55 4 16 4.45 16 5C16 5.55 15.55 6 15 6Z"
                  fill="#8B96A5"
                />
              </svg>
              <span className={`text-xs`}>Message</span>
            </Link>
            {/* Orders */}
            {getCookios.role &&
              getCookios?.role.toLowerCase() !== "admin".toLowerCase() && (
                <Link to={"/orders"} className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="none"
                  >
                    <path
                      d="M12.35 17.1302C11.59 17.8202 10.42 17.8202 9.66003 17.1202L9.55003 17.0202C4.30003 12.2702 0.870031 9.16017 1.00003 5.28017C1.06003 3.58017 1.93003 1.95017 3.34003 0.990166C5.98003 -0.809834 9.24003 0.0301659 11 2.09017C12.76 0.0301659 16.02 -0.819834 18.66 0.990166C20.07 1.95017 20.94 3.58017 21 5.28017C21.14 9.16017 17.7 12.2702 12.45 17.0402L12.35 17.1302Z"
                      fill="#8B96A5"
                    />
                  </svg>
                  <span className={`text-xs`}>Orders</span>
                </Link>
              )}
            {/* My cart */}
            <Link to={"/cart"} className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="21"
                viewBox="0 0 22 21"
                fill="none"
              >
                <path
                  d="M6.29989 16.7997C5.14491 16.7997 4.21043 17.7447 4.21043 18.8997C4.21043 20.0546 5.14491 20.9996 6.29989 20.9996C7.45487 20.9996 8.39985 20.0546 8.39985 18.8997C8.39985 17.7447 7.45487 16.7997 6.29989 16.7997ZM0 1.04998C0 1.62747 0.472492 2.09996 1.04998 2.09996H2.09996L5.8799 10.0693L4.46242 12.6313C3.69593 14.0383 4.70392 15.7497 6.29989 15.7497H17.8497C18.4272 15.7497 18.8997 15.2772 18.8997 14.6997C18.8997 14.1223 18.4272 13.6498 17.8497 13.6498H6.29989L7.45487 11.5498H15.2772C16.0647 11.5498 16.7577 11.1193 17.1147 10.4683L20.8736 3.65394C21.2621 2.96095 20.7581 2.09996 19.9601 2.09996H4.42042L3.71693 0.598489C3.54894 0.230996 3.17094 0 2.77195 0H1.04998C0.472492 0 0 0.472492 0 1.04998ZM16.7997 16.7997C15.6447 16.7997 14.7102 17.7447 14.7102 18.8997C14.7102 20.0546 15.6447 20.9996 16.7997 20.9996C17.9547 20.9996 18.8997 20.0546 18.8997 18.8997C18.8997 17.7447 17.9547 16.7997 16.7997 16.7997Z"
                  fill="#8B96A5"
                />
              </svg>
              <span className={`text-xs`}>My cart</span>
            </Link>
          </div>
        )}
      </nav>
      <Container
        component={"header"}
        className={`bg-[#FFF] ${loading && "hidden"} `}
        maxWidth={"xl"}
      >
        <CssBaseline />
        <nav
          className={`border-t-2 border-x-0 py-3 text-center hidden  ${
            loading ? "md:hidden" : "md:block"
          }  `}
        >
          {/* Links */}
          <div className={"flex gap-5 justify-center"}>
            {[
              { id: 1, name: "Home", route: "/" },
              { id: 7, name: "Products", route: "/products" },
              { id: 2, name: "Categories", route: "/categories" },
              { id: 3, name: "Favorites", route: "/favorites" },
              { id: 4, name: "Orders", route: "/orders" },
              { id: 5, name: "Contact us", route: "/contact" },
              { id: 6, name: "About", route: "/about" },
              { id: 8, name: "Sign-In", route: "/auth/sign-in" },
              { id: 9, name: "Sign-Up", route: "/auth/sign-up" },
            ].map(({ id, route, name }) => {
              if (getCookios.role) {
                if (
                  name === "Orders" &&
                  getCookios?.role.toLowerCase() === "admin".toLowerCase()
                ) {
                  return null;
                }
              }
              if (name === "Sign-In" && getCookios?.token) {
                return (
                  <button
                    key={id}
                    className={`hover:bg-red-300 p-1 rounded-lg`}
                    onClick={handleOpen}
                  >
                    {/* Add Model QA */}
                    Sign-Out
                  </button>
                );
              }
              return (
                <Link
                  className={`hover:bg-[#d5d5d5c4] p-1 rounded-lg ${
                    locationRouter.pathname.toLowerCase() ===
                      name.toLowerCase() && "bg-[#d5d5d5c4]"
                  }`}
                  key={id}
                  to={route}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-gray-200 p-4`}
          >
            <h1 className={`text-xl font-semibold`}>
              Are you sure you are checking out?
            </h1>
            <div className={`mt-10 flex justify-end gap-5`}>
              <button
                className={`px-5 bg-red-600 py-2 rounded-lg text-white hover:bg-red-700`}
                onClick={() => {
                  handleClose();
                  actionSignOut();
                }}
              >
                Yes
              </button>
              <button
                className={`px-5 bg-green-500 py-2 rounded-lg text-white hover:bg-green-600`}
                onClick={handleClose}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}

export default Navbar;
