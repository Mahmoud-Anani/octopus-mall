import React from "react";
import Footer from "../layout/Footer";
import axios from "axios";
import CategoryUi from "./CategoryUi";

export let dataCategory = [];
function Category() {
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  async function getCategory() {
    await axios
      .get(
        `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/category?limit=${
          import.meta.env.VITE_LIMITPRODUCTS
        }`
      )
      .then(({ data }) => {
        setLoading(false);
        setCategories(data.data);
        dataCategory = data.data;
        // ================ Test ==========
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  React.useEffect(() => {
    getCategory();
  }, []);

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
      <h1 className={`mb-5 text-xl font-semibold flex items-center`}>
        Categories:
        <hr className={`w-full`} />
      </h1>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-10`}
      >
        {categories.map(({ _id, name, slug }) => (
          <CategoryUi key={_id} name={name} slug={slug} />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Category;
