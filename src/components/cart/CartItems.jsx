import React from "react";

// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";
import ProductLoading from "../Loadings/ProductLoading";
import { EGP } from "../components-products/FormatPrice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const boxShadow = {
  boxShadow: "0px 1px 2px 0px rgba(56, 56, 56, 0.08)",
};

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function CartItems() {
  // controle route
  const navigate = useNavigate();
  // get user data
  const [getCookios, setCookios] = useCookies([
    "token",
    "slug",
    "userImg",
    "_id",
  ]);

  // handle data cart
  const [cartUserLogged, setCartUserLogged] = React.useState({});
  const [count_products, setcount_products] = React.useState(0);
  const [userHaveCart, setUserHaveCart] = React.useState(false);

  const [typeError, setTypeError] = React.useState("");
  const [silfLoading, setsilfLoading] = React.useState(true);

  const [userHaveCoupone, setUserHaveCoupone] = React.useState(false);
  const [texPrice, setTexPrice] = React.useState(0);
  const [shippingPrice, setShippingPrice] = React.useState(0);

  async function getUserCart() {
    setTypeError("");
    setsilfLoading(true);
    await axios
      .get(`${import.meta.env.VITE_DOMAIN_NAME}/api/v1/cart`, {
        headers: {
          Authorization: getCookios.token,
        },
      })
      .then((res) => {
        setsilfLoading(false);
        setcount_products(res.data.count_products);
        setCartUserLogged(res.data.data);
        setUserHaveCart(true);
        const isCopones = res.data.data.totalPriceAfterDiscount || false;
        if (isCopones) {
          setUserHaveCoupone(true);
        }
      })
      .catch((err) => {
        setsilfLoading(false);
        if (
          err.response.data.message ===
          "You don't have a cart, create one with Add any product"
        ) {
          setUserHaveCart(false);
          setTypeError(err.response.data.message);
        }
      });
  }

  async function getTexes() {
    await axios
      .get(`${import.meta.env.VITE_DOMAIN_NAME}/api/v1/texes`, {
        headers: {
          Authorization: getCookios.token,
        },
      })
      .then((res) => {
        setTexPrice(res.data.data.texPrice);
        setShippingPrice(res.data.data.shippingPrice);
      });
  }

  const [couponName, setCoupone] = React.useState("");
  const [errorCoupone, setErrorCoupone] = React.useState("");

  async function discountByCoupone() {
    await axios
      .put(
        `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/cart/coupon`,
        {
          couponName,
        },
        {
          headers: {
            Authorization: getCookios.token,
          },
        }
      )
      .then((res) => {
        getUserCart();
      })
      .catch((err) => {
        setErrorCoupone(err.response.data.message);
      });
  }

  async function checkOut() {
    await axios.post(
      `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/order/card`,
      {},
      {
        headers: {
          Authorization: getCookios.token,
        },
      }
    ).then(res => {
      const session = res.data.session;
      window.location.href = session.url;
    })
  }

  React.useEffect(() => {
    if (getCookios.token === undefined || getCookios.token === "undefined") {
      toast.success(`You must log in first`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/auth/sign-in");
    }
    getUserCart();
    getTexes();
  }, []);

  // if user dont have a cart or not have cartItems
  if (!userHaveCart || cartUserLogged.cartItems.length <= 0) {
    return null;
  }

  // if user have cart
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={"section"} maxWidth={"xl"}>
        <CssBaseline />
        {silfLoading ? (
          <div className={`flex justify-center `}>{<ProductLoading />}</div>
        ) : (
          <div>
            <h2 className={`text-[#1C1C1C] text-2xl font-semibold`}>
              My cart ({count_products})
            </h2>
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-5 justify-between `}
            >
              {/* Items */}
              <div className={`flex flex-col gap-4 mt-5 col-span-2`}>
                {cartUserLogged.cartItems.map(
                  ({ productId, quantity, color, price }) => (
                    <div
                      key={productId._id}
                      className={`flex justify-between border-2 gap-4 p-5 rounded-lg bg-[#FFF]`}
                    >
                      <div className="flex gap-5">
                        <Link
                          to={`/products/${productId._id}`}
                          className={`bg-[#F7F7F7] border-2 p-3 rounded-lg h-fit`}
                        >
                          <img
                            className={`w-20 `}
                            src={productId.imageCover}
                            alt={productId.title}
                          />
                        </Link>
                        {/* Data Product */}
                        <div className={`flex flex-col gap-1 justify-start`}>
                          <h3
                            className={`text-[#1C1C1C] text-base font-medium`}
                          >
                            {productId.title}
                          </h3>
                          <p className={`text-[#8B96A5] text-base font-normal`}>
                            {quantity}
                          </p>
                          <p>Color: {color}</p>
                          <div className={`flex justify-start gap-3`}>
                            <button
                              style={boxShadow}
                              className={`px-2 py-1 rounded-lg hover:bg-slate-100 bg-[#FFF] border-2 `}
                            >
                              <span
                                className={`text-[#FA3434] text-xs font-medium `}
                              >
                                Remove
                              </span>
                            </button>
                            <button
                              style={boxShadow}
                              className={`px-2 py-1 rounded-lg hover:bg-slate-100 bg-[#FFF] border-2`}
                            >
                              <span
                                className={`text-[#0D6EFD] text-xs font-medium`}
                              >
                                Save for later
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <span className={`text-[#1C1C1C] text-base font-medium`}>
                        {EGP.format(price)}
                      </span>
                    </div>
                  )
                )}
              </div>
              {/* Checkout  */}
              <div className={`flex flex-col gap-3`}>
                <div className={`bg-[#FFF] border-2 rounded-lg p-3`}>
                  <h5 className={`text-[#505050] text-base font-normal`}>
                    Have a coupon?
                  </h5>
                  <div className={`flex gap-0`}>
                    <input
                      onChange={(e) => {
                        setCoupone(e.target.value);
                        setErrorCoupone("");
                      }}
                      className={`border-2 rounded-l-lg p-2`}
                      type="text"
                      placeholder="Add coupon"
                    />
                    <button
                      onClick={discountByCoupone}
                      className={`text-[#0D6EFD] text-base font-normal border-2 p-2 rounded-r-lg`}
                    >
                      Apply
                    </button>
                  </div>
                  {errorCoupone && (
                    <div className="bg-red-300 text-center p-2 my-2 rounded-lg">
                      {errorCoupone}
                    </div>
                  )}
                </div>
                <div className={`bg-[#FFF] border-2 rounded-lg p-3`}>
                  <div className={`flex flex-col `}>
                    <div className={`flex flex-col gap-2`}>
                      <div className={`flex justify-between `}>
                        <span
                          className={`text-[#505050] text-base font-normal`}
                        >
                          Subtotal:
                        </span>{" "}
                        <span
                          className={`text-[#505050] text-base font-normal`}
                        >
                          {EGP.format(cartUserLogged.totalCartPrice)}
                        </span>
                      </div>

                      <div className={`flex justify-between`}>
                        <span
                          className={`text-[#505050] text-base font-normal`}
                        >
                          Price tax:
                        </span>{" "}
                        <span
                          className={`text-[#00B517] text-base font-normal`}
                        >
                          + {EGP.format(texPrice)}
                        </span>
                      </div>
                      <div className={`flex justify-between`}>
                        <span
                          className={`text-[#505050] text-base font-normal`}
                        >
                          Price shipping:{" "}
                        </span>{" "}
                        <span
                          className={`text-[#00B517] text-base font-normal`}
                        >
                          + {EGP.format(shippingPrice)}
                        </span>
                      </div>
                      {userHaveCoupone && (
                        <div className={`flex justify-between`}>
                          <span
                            className={`text-[#505050] text-base font-normal`}
                          >
                            Discount:{" "}
                          </span>
                          <span
                            className={`text-[#FA3434] text-base font-normal`}
                          >
                            -{" "}
                            {EGP.format(
                              cartUserLogged.totalCartPrice -
                                cartUserLogged.totalPriceAfterDiscount
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                    <hr className={`my-4`} />
                    <div className={`flex justify-between`}>
                      <span
                        className={`text-[#1C1C1C] text-base font-semibold`}
                      >
                        Total:
                      </span>
                      <span className={`text-[#1C1C1C] text-xl font-semibold`}>
                        {userHaveCoupone
                          ? EGP.format(
                              cartUserLogged.totalCartPrice +
                                texPrice +
                                shippingPrice -
                                (cartUserLogged.totalCartPrice -
                                  cartUserLogged.totalPriceAfterDiscount)
                            )
                          : EGP.format(
                              cartUserLogged.totalCartPrice +
                                texPrice +
                                shippingPrice
                            )}
                      </span>
                    </div>
                    <div className="flex flex-col gap-5 justify-center my-3">
                      <button
                        onClick={checkOut}
                        className={`text-[#FFF] text-lg w-full font-medium px-3 py-2 rounded-lg bg-[#00B517]`}
                      >
                        Checkout
                      </button>
                      <div className="flex justify-center gap-3">
                        <div className="p-2 rounded-lg border-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="12"
                            viewBox="0 0 19 12"
                            fill="none"
                          >
                            <path
                              d="M7.08971 5.85255C7.08971 4.01564 7.93841 2.38017 9.25983 1.32178C8.28542 0.54133 7.05453 0.0740967 5.71493 0.0740967C2.55869 0.0740967 0 2.66122 0 5.85255C0 9.04388 2.55869 11.631 5.71493 11.631C7.05453 11.631 8.28542 11.1638 9.25983 10.3833C7.93841 9.32493 7.08971 7.68947 7.08971 5.85255Z"
                              fill="#EB001B"
                            />
                            <path
                              d="M7.08984 5.85255C7.08984 7.68946 7.93854 9.32493 9.25996 10.3833C10.5813 9.32493 11.43 7.68946 11.43 5.85255C11.43 4.01563 10.5813 2.38017 9.25996 1.32178C7.93854 2.38017 7.08984 4.01563 7.08984 5.85255Z"
                              fill="#FF5E00"
                            />
                            <path
                              d="M12.8046 0.0740967C11.465 0.0740967 10.2341 0.54133 9.25977 1.32178C10.5811 2.38025 11.4298 4.01564 11.4298 5.85255C11.4298 7.68947 10.5811 9.32493 9.25977 10.3833C10.2341 11.1638 11.465 11.631 12.8046 11.631C15.9608 11.631 18.5195 9.04388 18.5195 5.85255C18.5195 2.66122 15.9608 0.0740967 12.8046 0.0740967Z"
                              fill="#F79E1C"
                            />
                          </svg>
                        </div>
                        <div className="p-2 rounded-lg border-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="15"
                            viewBox="0 0 12 15"
                            fill="none"
                          >
                            <path
                              d="M10.099 1.05579C9.46156 0.316817 8.30919 0 6.83496 0H2.55634C2.25502 1.13472e-05 1.99842 0.222835 1.9512 0.525501L0.169662 12.0167C0.134251 12.2433 0.306777 12.4485 0.532603 12.4485H3.17407L3.83746 8.16914L3.81687 8.30314C3.86413 8.00065 4.11851 7.77755 4.41973 7.77755H5.67495C8.14082 7.77755 10.0716 6.75893 10.6357 3.81228C10.6524 3.72513 10.6669 3.64031 10.6794 3.55744C10.6083 3.5191 10.6083 3.5191 10.6794 3.55744C10.8474 2.46833 10.6783 1.72698 10.099 1.05579Z"
                              fill="#27346A"
                            />
                            <path
                              d="M4.84818 3.1651C4.9204 3.13013 4.99938 3.11201 5.07936 3.11206H8.43372C8.83093 3.11206 9.20142 3.13835 9.53997 3.19377C9.63471 3.20913 9.72896 3.22747 9.82258 3.24876C9.95527 3.27854 10.0864 3.31499 10.2156 3.35797C10.382 3.4145 10.537 3.48034 10.6795 3.55744C10.8474 2.46791 10.6783 1.72698 10.099 1.05579C9.46119 0.316817 8.30919 0 6.83496 0H2.55598C2.25471 0 1.99841 0.223061 1.9512 0.525501L0.169662 12.0163C0.134251 12.2432 0.306778 12.4481 0.532237 12.4481H3.17407L4.55039 3.57177C4.57786 3.39466 4.68921 3.24261 4.84818 3.1651Z"
                              fill="#27346A"
                            />
                            <path
                              d="M10.6358 3.81221C10.0718 6.75844 8.14106 7.77748 5.67514 7.77748H4.41955C4.11833 7.77748 3.86391 8.00059 3.8171 8.30307L2.99181 13.6239C2.96097 13.8222 3.11176 14.0019 3.30904 14.0019H5.53573C5.79924 14.0019 6.02357 13.8069 6.06475 13.5422L6.08644 13.4268L6.50611 10.7218L6.53315 10.5723C6.57432 10.3076 6.79863 10.1127 7.06212 10.1126H7.39537C9.55238 10.1126 11.2414 9.22138 11.7349 6.64384C11.9409 5.56669 11.8343 4.66737 11.2894 4.03569C11.1241 3.84437 10.9188 3.68635 10.6796 3.55737C10.6667 3.64066 10.6526 3.72506 10.6358 3.81221Z"
                              fill="#2790C3"
                            />
                            <path
                              d="M10.0893 3.31802C10.0014 3.2919 9.9126 3.26878 9.82314 3.24869C9.72947 3.22774 9.63523 3.20953 9.54053 3.19406C9.20161 3.13828 8.8314 3.11194 8.43382 3.11194H5.07988C4.99983 3.11176 4.92079 3.13003 4.8487 3.1654C4.68953 3.24268 4.57808 3.39484 4.55086 3.57207L3.83797 8.16906L3.81738 8.30307C3.86428 8.00058 4.11865 7.77747 4.41992 7.77747H5.67551C8.14138 7.77747 10.0722 6.75885 10.6362 3.8122C10.653 3.72506 10.6671 3.6406 10.68 3.55736C10.5372 3.48068 10.3826 3.41443 10.2161 3.35827C10.1741 3.3441 10.1318 3.33068 10.0894 3.31802"
                              fill="#1F264F"
                            />
                          </svg>
                        </div>
                        <div className="p-2 rounded-lg border-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="8"
                            viewBox="0 0 24 8"
                            fill="none"
                          >
                            <path
                              d="M17.361 0.334359L17.0832 1.98113C16.2502 1.51036 14.3544 1.39897 14.3542 2.26605C14.3542 2.61051 14.7831 2.84741 15.3001 3.13294C16.0842 3.56597 17.0708 4.11084 17.0708 5.31241C17.0708 7.23241 15.0668 7.93785 13.7384 7.93785C12.4104 7.93785 11.5412 7.50482 11.5412 7.50482L11.8306 5.78297C12.6276 6.43918 15.0426 6.62564 15.0426 5.58503C15.0426 5.14775 14.5672 4.88988 14.0159 4.59085C13.2553 4.17826 12.3502 3.68731 12.3502 2.53867C12.3502 0.433026 14.6442 0 15.6102 0C16.5038 0 17.361 0.334359 17.361 0.334359ZM23.856 7.80554H22.0686L21.8406 6.66646H19.366L18.9602 7.80554H16.931L19.8342 0.708308C19.8342 0.708308 20.0102 0.136821 20.7328 0.136821H22.2976L23.856 7.80554ZM6.7576 0.137026L4.9018 5.41149L4.6822 4.27569L4.6824 4.2761L4.0274 0.827487C4.0274 0.827487 3.9482 0.137026 3.104 0.137026H0.036L0 0.266872C0 0.266872 0.9382 0.467077 2.0362 1.14338L3.7274 7.80574H5.7556L8.8526 0.137026H6.7576ZM10.3418 7.80554H8.3952L9.6118 0.137026H11.5586L10.3418 7.80554ZM19.9266 5.09292L20.9494 2.22318L21.5248 5.09292H19.9266Z"
                              fill="#2566AF"
                            />
                            <path
                              d="M4.6824 4.27592L4.0274 0.827302C4.0274 0.827302 3.9482 0.136841 3.104 0.136841H0.036L0 0.266687C0 0.266687 1.4746 0.580123 2.889 1.75448C4.2414 2.87694 4.6824 4.27592 4.6824 4.27592Z"
                              fill="#E6A540"
                            />
                          </svg>
                        </div>
                        <div className="p-2 rounded-lg border-2">
                          <img
                            className="w-8"
                            src={
                              "https://s3-alpha-sig.figma.com/img/d68e/163a/dd572705363074e41cf2cd18c4fe83fe?Expires=1695600000&Signature=d0jZ5u4q2~S7rYZcBQmTq904ftmURFHV2A492zNAXQZ0P4fVF33etr1AUQqOdwfIJe3MuhLLoC0dH6mkdCfHhn~HHOcI8CJiNwU6RPJm-0RcropcZVSkazSFfyy0kb9GyAtClMqFpGp7Y0gn2ShkHHeooArOIAptad3UtJK~domoM54SE5M9DTZ6eV6s-FLWoR9CFkHLHJ1uHBtFsgHG8EGJAdXF-GVqGXZJHKqZP0Wp5GK222UyzvE-69y662AzvhftVhECodRqTVeSuzln7c2m9ILXW7Qd2srITaYu8XD28EtnmFcM3J1kbf7x27XaNgdyKBAGkX0Ow-PGCEfKNg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                            }
                            alt="pay"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default CartItems;
