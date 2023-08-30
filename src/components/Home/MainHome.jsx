import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Container,
  CssBaseline,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { storeCategorys } from "../../store/ViewProductHome";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay} from "swiper/modules";

const defaultTheme = createTheme();

function MainHome() {
  const [categorys] = useRecoilState(storeCategorys);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={"section"} maxWidth={"xl"}>
        <CssBaseline />
        {categorys ? (
          <div
            className={`lg:hidden flex gap-5 flex-nowrap overflow-scroll p-2 `}
          >
            <button
              className={`px-2 py-1 bg-[#EFF2F4] rounded-lg text-[#0D6EFD] whitespace-nowrap`}
            >
              All category
            </button>
            {categorys.map((cate) => (
              <button
                className={`px-2 py-1 bg-[#EFF2F4] rounded-lg text-[#0D6EFD] whitespace-nowrap`}
                key={cate._id}
              >
                {cate.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="spinner ms-2"></div>
        )}
        <div
          className={`flex justify-between bg-[#fff] rounded-lg p-1 mt-2 border-1`}
        >
          {/* List Category */}
          <div className="hidden lg:block">
            <Box>
              {categorys ? (
                <ListItem className="flex flex-col justify-start text-start">
                  <ListItemButton className="whitespace-nowrap">
                    All category
                  </ListItemButton>
                  {categorys.slice(0, 10).map((cate) => (
                    <ListItemButton
                      className="whitespace-nowrap"
                      key={cate._id}
                    >
                      {cate.name}
                    </ListItemButton>
                  ))}
                </ListItem>
              ) : (
                <div className="spinner ms-2"></div>
              )}
            </Box>
          </div>

          {/* Slide Show */}
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className=""
          >
            <SwiperSlide
              className={` bg-red-900 bg-cover p-10 bg-[url('https://octopus-shop.onrender.com/disktop/1.avif')] `}
            >
              <div className="flex flex-col gap-2">
                <p className={`text-2xl font-normal`}>Latest trending</p>
                <p className={`text-3xl font-bold`}>Electronic items</p>
              </div>
              <button
                className={`text-[#1C1C1C] bg-[#FFF] rounded-lg text-lg font-medium px-8 py-2 mt-3`}
              >
                Learn more
              </button>
            </SwiperSlide>
            <SwiperSlide
              className={` bg-red-900 bg-cover p-10 bg-[url('https://octopus-shop.onrender.com/disktop/2.avif')] `}
            >
              <div className="flex flex-col gap-2">
                <p className={`text-2xl font-normal`}>Latest trending</p>
                <p className={`text-3xl font-bold`}>shoe items</p>
              </div>
              <button
                className={`text-[#1C1C1C] bg-[#FFF] rounded-lg text-lg font-medium px-8 py-2 mt-3`}
              >
                Learn more
              </button>
            </SwiperSlide>
            <SwiperSlide
              className={` bg-red-900 bg-cover p-10 bg-[url('https://octopus-shop.onrender.com/disktop/3.avif')] `}
            >
              <div className="flex flex-col gap-2 text-white">
                <p className={`text-2xl font-normal`}>Latest trending</p>
                <p className={`text-3xl font-bold`}>most expensive products</p>
              </div>
              <button
                className={`text-[#1C1C1C] bg-[#FFF] rounded-lg text-lg font-medium px-8 py-2 mt-3`}
              >
                Learn more
              </button>
            </SwiperSlide>
          </Swiper>
          {/* Discounts */}
          <div className={`hidden sm:block px-5`}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
                  to={"auth/sign-in"}
                >
                  Log in
                </Link>
              </div>
              <div className={`bg-[#F38332] text-[#FFF] rounded-lg p-5 `}>
                <p>Get US $10 off with a new supplier</p>
              </div>
              <div className={`bg-[#55BDC3] text-[#FFF] rounded-lg p-5 `}>
                <p>Send quotes with supplier preferences</p>
              </div>
            </Box>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default MainHome;
