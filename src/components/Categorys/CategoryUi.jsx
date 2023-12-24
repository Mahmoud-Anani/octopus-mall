import React from "react";
import { Link } from "react-router-dom";

function CategoryUi({ name, slug, isSubCategory = false }) {
  const [hoverCart, setHoverCart] = React.useState(false);
  if (isSubCategory) {
    return (
      <>
        <div
          onMouseEnter={() => setHoverCart(true)}
          onMouseLeave={() => setHoverCart(false)}
          className={`w-[200px] relative px-5 min-h-[100px] rounded-lg text-center overflow-hidden bg-red-400 `}
        >
          {hoverCart && (
            <div
              className={`absolute duration-1000 w-full left-0 bottom-0 h-${
                hoverCart ? "full" : "0"
              } rounded-lg bg-green-400`}
            >
              Name:{name}
            </div>
          )}
        </div>
      </>
    );
  }
  return (
    <>
      <Link
        onMouseEnter={() => setHoverCart(true)}
        onMouseLeave={() => setHoverCart(false)}
        to={slug}
        className={`w-[200px] relative px-5 min-h-[100px] rounded-lg text-center overflow-hidden bg-red-400 `}
      >
        {hoverCart && (
          <div
            className={`absolute duration-1000 w-full left-0 bottom-0 h-${
              hoverCart ? "full" : "0"
            } rounded-lg bg-green-400`}
          >
            Name:{name}
          </div>
        )}
      </Link>
    </>
  );
}

export default CategoryUi;
