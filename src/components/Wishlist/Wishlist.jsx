import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WishlistUiTable from "./WishlistUiTable";
import { useRecoilState } from "recoil";
import { renderDataState } from "../../store/WishlistStore";

function Wishlist() {
  // handle auth user
  const [getCookies] = useCookies(["token"]);
  const navigate = useNavigate();

  // get my wishlist
  const [wishlist, setWishlist] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  async function getMyWishlist() {
    await axios
      .get(`${import.meta.env.VITE_DOMAIN_NAME}/api/v1/wishlist`, {
        headers: {
          Authorization: getCookies.token,
        },
      })
      .then(({ data }) => {
        setWishlist(data.data.wishlist);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // ======= Test =========
  // console.log(wishlist);
  const [renderData] = useRecoilState(renderDataState);
// console.log(renderData);
  React.useEffect(() => {
    if (!getCookies.token) {
      return navigate("/auth/sign-in");
    }
    getMyWishlist();
  }, [renderData]);

  if (loading) {
    return (
      <div
        className={`h-[100vh]  flex justify-center items-center bg-slate-900 `}
      >
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className={`mx-4 py-5`}>
      <h1
        className={`mb-5 text-xl font-semibold flex items-center whitespace-nowrap gap-2`}
      >
        My Wishlist:
      </h1>
      <WishlistUiTable dataWishlist={wishlist} />
    </div>
  );
}

export default Wishlist;

/*

{
    "_id": "65058f277d7a8ee9f96281ca",
    "title": "new product 37",
    "description": "this new description",
    "quantity": 24,
    "price": 108,
    "imageCover": "https://octopus-shop.onrender.com/product/images/1694863142389-ryan-plomp-jvoZ-Aux9aw-unsplash.jpg",
    "id": "65058f277d7a8ee9f96281ca"
}

[
    {
        "id": 1,
        "title": "Cupcake",
        "description": 305,
        "quantity": 3.7,
        "price": 67,
        "imageCover": 4.3
    },
    {
        "id": 2,
        "title": "Donut",
        "description": 452,
        "quantity": 25,
        "price": 51,
        "imageCover": 4.9
    }
]

[
    {
        "id": "65058f277d7a8ee9f96281ca",
        "title": "new product 37",
        "description": "this new description",
        "quantity": 24,
        "price": 108,
        "imageCover": "https://octopus-shop.onrender.com/product/images/1694863142389-ryan-plomp-jvoZ-Aux9aw-unsplash.jpg"
    },
    {
        "id": "65058f7e7d7a8ee9f96281d0",
        "title": "new product 38",
        "description": "this new description",
        "quantity": 24,
        "price": 108,
        "imageCover": "https://octopus-shop.onrender.com/product/images/1694863229329-ryan-plomp-jvoZ-Aux9aw-unsplash.jpg"
    }
]



*/
