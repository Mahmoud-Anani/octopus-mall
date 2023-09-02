import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";

import axios from "axios";
import { useRecoilState } from "recoil";
import { suppliersState } from "../../store/ViewProductHome";


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function SuppliersRegion() {
  const [suppliersData, setSuppliersData] = useRecoilState(suppliersState);
  const suppliers = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/suppliers`
    );
    setSuppliersData(res.data.data);
  };

  React.useEffect(() => {
    suppliers();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={"section"} maxWidth={"xl"}>
        <CssBaseline />
        <p className={`text-[#1C1C1C] text-2xl font-semibold mt-4`}>
          Suppliers by region 
        </p>
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 justify-between  gap-3 mt-3`}
        >
          {suppliersData.map(({ _id, name, website, flageSvg }) => {
            const urlView = website.replace("https://", "");
            return (
              <a
                href={website}
                target="_blank"
                key={_id}
                className={`flex items-center justify-center gap-2 bg-[#FFF] rounded-lg hover:bg-[#d8d7d7] duration-150`}
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30" // يمكنك تعيين العرض والارتفاع بما يناسبك
                    height="30"
                    dangerouslySetInnerHTML={{ __html: flageSvg }}
                  ></svg>
                </div>
                <div className="flex flex-col ">
                  <p className={`text-[#1C1C1C] text-base font-normal`}>
                    {name}
                  </p>
                  <span
                    className={`text-[#8B96A5] text-xs font-normal`}
                    href={website}
                    target="_blank"
                  >
                    {urlView}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default SuppliersRegion;
