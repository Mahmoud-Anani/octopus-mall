import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dataCategory } from "./Category";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import CategoryUi from "./CategoryUi";

function SingleCategory() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [myCategory, setMyCategory] = React.useState({});
  const [mySubCategory, setMySubCategory] = React.useState([]);
  function filterCategory() {
    const filterData = dataCategory.find(
      (categoryData) => categoryData?.slug === category
    );
    setMyCategory(filterData);
    // ====== Test ==========
    // console.log(filterData);
  }
  // get user data
  const [getCookios, setCookios] = useCookies(["token"]);
  const [loading, setLoading] = React.useState(true);
  async function getSubCategory() {
    await axios
      .get(
        `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/subcategory?limit=${
          import.meta.env.VITE_LIMITPRODUCTS
        }`,
        {
          headers: {
            Authorization: getCookios.token,
          },
        }
      )
      .then(({ data }) => {
        const filterSubCategory = data.data.filter(
          (subCategoryData) => subCategoryData.categori._id === myCategory._id
        );
        setMySubCategory(filterSubCategory);
        setLoading(false);
        // ================ Test ==========
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  React.useEffect(() => {
    filterCategory();
    if (myCategory === undefined) {
      return navigate("/categories");
    }
    if (getCookios.token === undefined) {
      toast.info(`Must be login first`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return navigate("/auth/sign-in");
    }
    getSubCategory();
  }, [dataCategory, myCategory, mySubCategory]);

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
    <div className={`mx-4 py-5`}>
      <div className={`flex flex-col gap-10`}>
        <h1
          className={`mb-5 text-xl font-semibold flex items-center whitespace-nowrap gap-2`}
        >
          {myCategory?.name}:<hr className={`w-full`} />
        </h1>
        <div
          className={`${
            mySubCategory.length > 0 ? "grid" : "flex"
          } grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 justify-items-center text-center gap-10`}
        >
          {mySubCategory.length > 0 ? (
            mySubCategory.map(({ _id, name, slug }) => (
              <CategoryUi
                key={_id}
                name={name}
                slug={slug}
                isSubCategory={true}
              />
            ))
          ) : (
            <h1 className={`text-xl text-red-400 text-center w-full`}>
              Not added yet...
            </h1>
          )}
        </div>
        <Link
          to="/categories"
          className={`px-5 py-2 w-fit bg-red-300 rounded-lg hover:bg-red-400`}
        >
          Back
        </Link>
      </div>
    </div>
  );
}

export default SingleCategory;
