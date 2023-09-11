import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { EffectCube, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { brandsStore } from "../../store/ViewProductHome";
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
function Brands() {
  const [brands, setBrands] = useRecoilState(brandsStore);
  const getBrands = async () => {
    await axios
      .get(`${import.meta.env.VITE_DOMAIN_NAME}/api/v1/brands`)
      .then((res) => setBrands(res.data.data));
  };

  React.useEffect(() => {
    getBrands();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={"section"} maxWidth={"xl"}>
        <CssBaseline />
        <div className="">
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
                spaceBetween: 2,
              },
              "@0.25": {
                slidesPerView: 2,
                spaceBetween: 4,
              },
              "@0.50": {
                slidesPerView: 3,
                spaceBetween: 6,
              },
              "@0.75": {
                slidesPerView: 4,
                spaceBetween: 8,
              },
            }}
            modules={[Pagination]}
            className="mySwiper cursor-grab"
          >
            {brands.map(({ name, slug }) => (
              <SwiperSlide className={`text-center`}>
                <h1 className={`text-slate-300 text-6xl`}>{slug}</h1>
                <span className={`text-lg font-bold`}>{name}</span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default Brands;
