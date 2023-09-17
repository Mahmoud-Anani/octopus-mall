import React from "react";
// Cookies
import { useCookies } from "react-cookie";
// Routes
import { Link } from "react-router-dom";
// Fetching
import axios from "axios";
import { toast } from "react-toastify";
import ProductLoading from "../Loadings/ProductLoading";

let fullNameMain = "";
let userImgMain = "";

function Cart({ productId, colorChoose = "any" }) {
  // get user data
  const [getCookios, setCookios] = useCookies([
    "token",
    "slug",
    "userImg",
    "_id",
  ]);

  const [, setfullUserName] = React.useState("");

  React.useEffect(() => {
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
  }, []);

  const [silfLoading, setsilfLoading] = React.useState(false);

  // handle cart user logged
  // 1) add product (productId, color, quantity) in cart user logged
  const [quantity, setQuantity] = React.useState(1);
  const [colorGet, setColor] = React.useState(colorChoose);
  const [typeError, setTypeError] = React.useState("");

  async function addProductToCart() {
    setTypeError("");
    setsilfLoading(true);
    await axios
      .post(
        `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/cart`,
        {
          productId,
          color: colorChoose,
          quantity,
        },
        {
          headers: {
            Authorization: getCookios.token,
          },
        }
      )
      .then((res) => {
        setsilfLoading(false);
        getUserCart();
        toast.success(`${res.data.message}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        setsilfLoading(false);
        setTypeError(err.response.data.message);
      });
  }
  async function updateProductToCart() {
    setTypeError("");
    setsilfLoading(true);
    await axios
      .put(
        `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/cart/${productId}`,
        {
          color: colorChoose,
          quantity,
        },
        {
          headers: {
            Authorization: getCookios.token,
          },
        }
      )
      .then((res) => {
        setsilfLoading(false);
        getUserCart();
        toast.success(`${res.data.message}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        setsilfLoading(false);
        setTypeError(err.response.data.message);
      });
  }

  const [cartUserLogged, setCartUserLogged] = React.useState({});
  const [isProductsInserted, setIsProductsInserted] = React.useState(false);
  const [userHaveCart, setUserHaveCart] = React.useState(false);

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
        setCartUserLogged(res.data.data);
        const isInserted = res.data.data.cartItems.filter(
          (item) => item.productId._id === productId
        );
        if (isInserted.length > 0) {
          setIsProductsInserted(true); // product insered
          setQuantity(isInserted[0].quantity);
          setColor(isInserted[0].color);
        }
      })
      .catch((err) => {
        setsilfLoading(false);
        if (
          err.response.data.message ===
          "You don't have a cart, create one with Add any product"
        ) {
          setUserHaveCart(false);
          // setTypeError(err.response.data.message);
        }
      });
  }

  async function deleteSingleProduct() {
    setTypeError("");
    setsilfLoading(true);
    await axios
      .delete(`${import.meta.env.VITE_DOMAIN_NAME}/api/v1/cart/${productId}`, {
        headers: {
          Authorization: getCookios.token,
        },
      })
      .then((res) => {
        setsilfLoading(false);
        toast.success(`Deleted`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getUserCart();
        setIsProductsInserted(false);
      });
    return true;
  }

  React.useEffect(() => {
    getUserCart();
  }, [userHaveCart]);

  return (
    <div className="mt-5">
      {/* title name */}
      <div>
        <div>
          {getCookios.token === undefined ? (
            <div className={`bg-[#E3F0FF] rounded-lg p-5 flex flex-col gap-2 `}>
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
              <div className={`flex gap-2 items-center justify-between`}>
                <div className={`mb-2 flex items-center gap-2`}>
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
                  <p className="font-normal text-lg ">
                    Hi, {`${getCookios.slug} `}
                  </p>
                </div>
                {colorGet && (
                  <button
                    style={{ background: "#" + colorGet }}
                    className={`px-3 h-5 py-1 mx-1 rounded-full `}
                  ></button>
                )}
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
                  <span className={`text-[#8B96A5] text-base font-normal`}>
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
                  <span className={`text-[#8B96A5] text-base font-normal`}>
                    Worldwide shipping
                  </span>
                </div>
              </div>
              {isProductsInserted ? (
                silfLoading ? (
                  <div className={`flex justify-center `}>
                    {<ProductLoading />}
                  </div>
                ) : (
                  <div className={`flex flex-col gap-5`}>
                    <div className={`flex justify-between`}>
                      <button
                        className={`text-[#FFF] w-[25%] rounded-lg ${
                          quantity === 1 ? "bg-red-400" : "bg-gradient-to-l"
                        } from-[#689ddb] to-[#1a69de]`}
                        onClick={() => {
                          setTypeError("");
                          quantity > 1 && setQuantity(quantity - 1);
                          quantity === 1 && deleteSingleProduct();
                        }}
                      >
                        {quantity === 1 ? "remove" : "-"}
                      </button>
                      <span className={`bg-[#f0efef70] w-[100%] text-center`}>
                        {quantity}
                      </span>
                      <button
                        className={`text-[#FFF] w-[25%] rounded-lg bg-gradient-to-l from-[#6897cd] to-[#2873e3]`}
                        onClick={() => {
                          setQuantity(quantity + 1);
                          setTypeError("");
                        }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => updateProductToCart()}
                      className={`rounded-lg px-5 py-2 bg-gradient-to-l whitespace-nowrap text-[#FFF] from-[#127FFF] to-[#0067FF] text-center`}
                    >
                      Update Qauntity
                    </button>
                  </div>
                )
              ) : silfLoading ? (
                <div className={`flex justify-center `}>
                  {<ProductLoading />}
                </div>
              ) : (
                <button
                  onClick={() => addProductToCart()}
                  className={`rounded-lg px-5 py-2 bg-gradient-to-l whitespace-nowrap text-[#FFF] from-[#127FFF] to-[#0067FF] text-center`}
                >
                  add to cart
                </button>
              )}
              <div
                className={`bg-red-200 ${
                  typeError && "p-2"
                } mt-5 rounded-lg text-center`}
              >
                {typeError}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
