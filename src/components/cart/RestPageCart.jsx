import React from "react";
// Silf Components
import Footer from "../layout/Footer";
import DiscountOf100 from "../ads/DiscountOf100";

// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


const itemsService = [
  {
    id: 1,
    title: "Secure payment",
    disc: "Have you ever finally just",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <circle cx="24" cy="24" r="24" fill="#DEE2E7" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M30 20H29V18C29 15.24 26.76 13 24 13C21.24 13 19 15.24 19 18V20H18C16.9 20 16 20.9 16 22V32C16 33.1 16.9 34 18 34H30C31.1 34 32 33.1 32 32V22C32 20.9 31.1 20 30 20ZM24 29C22.9 29 22 28.1 22 27C22 25.9 22.9 25 24 25C25.1 25 26 25.9 26 27C26 28.1 25.1 29 24 29ZM21 20V18C21 16.34 22.34 15 24 15C25.66 15 27 16.34 27 18V20H21Z"
          fill="#8B96A5"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Customer support",
    disc: "Have you ever finally just",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <circle cx="24" cy="24" r="24" fill="#DEE2E7" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M32 15H16C14.9 15 14.01 15.9 14.01 17L14 35L18 31H32C33.1 31 34 30.1 34 29V17C34 15.9 33.1 15 32 15ZM19 22H29C29.55 22 30 22.45 30 23C30 23.55 29.55 24 29 24H19C18.45 24 18 23.55 18 23C18 22.45 18.45 22 19 22ZM25 27H19C18.45 27 18 26.55 18 26C18 25.45 18.45 25 19 25H25C25.55 25 26 25.45 26 26C26 26.55 25.55 27 25 27ZM29 21H19C18.45 21 18 20.55 18 20C18 19.45 18.45 19 19 19H29C29.55 19 30 19.45 30 20C30 20.55 29.55 21 29 21Z"
          fill="#8B96A5"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Free delivery",
    disc: "Have you ever finally just",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <circle cx="24" cy="24" r="24" fill="#DEE2E7" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M31.5 20H29V18C29 16.9 28.1 16 27 16H15C13.9 16 13 16.9 13 18V27C13 28.1 13.9 29 15 29C15 30.66 16.34 32 18 32C19.66 32 21 30.66 21 29H27C27 30.66 28.34 32 30 32C31.66 32 33 30.66 33 29H34C34.55 29 35 28.55 35 28V24.67C35 24.24 34.86 23.82 34.6 23.47L32.3 20.4C32.11 20.15 31.81 20 31.5 20ZM18 30C17.45 30 17 29.55 17 29C17 28.45 17.45 28 18 28C18.55 28 19 28.45 19 29C19 29.55 18.55 30 18 30ZM31.5 21.5L33.46 24H29V21.5H31.5ZM30 30C29.45 30 29 29.55 29 29C29 28.45 29.45 28 30 28C30.55 28 31 28.45 31 29C31 29.55 30.55 30 30 30Z"
          fill="#8B96A5"
        />
      </svg>
    ),
  },
];


function RestPageCart() {
  return (
    <React.Fragment>
      <ThemeProvider theme={defaultTheme}>
        <Container component={"section"} maxWidth={"xl"}>
          <CssBaseline />
          <div
            className={`grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-10 w-[70%]`}
          >
            {itemsService.map(({ icon, title, disc }) => (
              <div className={`flex gap-2 items-start justify-start`}>
                <div>{icon}</div>
                <div>
                  <h4 className={`text-[#1C1C1C] text-base font-normal`}>
                    {title}
                  </h4>
                  <h6 className={`text-[#A9ACB0] text-base font-normal`}>
                    {disc}
                  </h6>
                </div>
              </div>
            ))}
          </div>
          <DiscountOf100 />
        </Container>
      </ThemeProvider>
      <Footer />
    </React.Fragment>
  );
}

export default RestPageCart;
