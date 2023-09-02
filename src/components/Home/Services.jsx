import React from "react";
import ServicesComponent from "../components-products/ServicesComponent";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function Services() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={"section"} maxWidth={"xl"}>
        <CssBaseline />
        <p className={`text-[#1C1C1C] text-2xl font-semibold mt-4`}>
          Our extra services
        </p>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-between  gap-3 mt-3`}
        >
          <ServicesComponent
            img={
              "https://s3-alpha-sig.figma.com/img/b564/a957/ce3a966c5d76f6c21ddcaeba336dd251?Expires=1694390400&Signature=lKyGRWtRnRasvr5wQZwBWFODE7~67iuq2V8M0XTvshiBaYhmSpwqJoVnOrLsBJWBFOJnvv-I0Eqyed~7DW-ozf6vNBMxH2eXQ6SG5Qzgd4F62MsFogBNDrR6xnKtsAAji4OPyw4czPyG4ACiZMOxbP6tt7bCf3H8M8jFEUrIRvEJK9h8zWPdZCuh1nil75LbEIYPrxQn-YsGrU70OihOHbcEthGWz6XuQK6oL2XrscNTg35RrMTQ5CqyLu3OwNij6Wruwv-prrU5wJm0R4tBk5cOLMXpdWFMdVqCeQlND9wpbldhbVuN4jeyVAKFsSUC0cFvc7ZkcQFq1b3IfSi1~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            }
            title={"Source from Industry Hubs"}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15.755 14.255H14.965L14.685 13.985C15.665 12.845 16.255 11.365 16.255 9.755C16.255 6.165 13.345 3.255 9.755 3.255C6.165 3.255 3.255 6.165 3.255 9.755C3.255 13.345 6.165 16.255 9.755 16.255C11.365 16.255 12.845 15.665 13.985 14.685L14.255 14.965V15.755L19.255 20.745L20.745 19.255L15.755 14.255ZM9.755 14.255C7.26501 14.255 5.255 12.245 5.255 9.755C5.255 7.26501 7.26501 5.255 9.755 5.255C12.245 5.255 14.255 7.26501 14.255 9.755C14.255 12.245 12.245 14.255 9.755 14.255Z"
                  fill="#1C1C1C"
                />
              </svg>
            }
          />
          <ServicesComponent
            img={
              "https://s3-alpha-sig.figma.com/img/4b08/c60c/3829236b56ad902eb0d7bc9954d83888?Expires=1694390400&Signature=TGNPUFmlccCEbljqV9RYDt9cV-aRoLXPzcFOCMZtaEylYKsvfu1aXZ-6dstfHeEpqrraMP7nqLBxxMxsr7MN2L9vHh6jIkm6CCUVSulW2PGHdPCfd-mCPRs5POEF-J7Or7J~sQP5ctiDJw4pkKByEaQvSA-~83a70GbifG~ra6EwcNwNVUA-nSkHRgx14gERbMXAXTqf2g6gnV7rtsSJdCUaQJC-UH9BqAgIjVc-ojkettNlhxabuYS8kQjRUwPVjCeuZWDNjPQcXG-aIOQvMoHmHpulSiRqUtZ1yiQOyrE3GhwqnGhg8~0-1PeGiA4uv4gwqqgKOXaAfKYLL3Q32g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            }
            title={"Source from Industry Hubs"}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 2H4C3 2 2 2.9 2 4V7.01C2 7.73 2.43 8.35 3 8.7V20C3 21.1 4.1 22 5 22H19C19.9 22 21 21.1 21 20V8.7C21.57 8.35 22 7.73 22 7.01V4C22 2.9 21 2 20 2ZM19 20H5V9H19V20ZM20 7H4V4H20V7Z"
                  fill="#1C1C1C"
                />
                <path d="M15 12H9V14H15V12Z" fill="#1C1C1C" />
              </svg>
            }
          />
          <ServicesComponent
            img={
              "https://s3-alpha-sig.figma.com/img/b564/a957/ce3a966c5d76f6c21ddcaeba336dd251?Expires=1694390400&Signature=lKyGRWtRnRasvr5wQZwBWFODE7~67iuq2V8M0XTvshiBaYhmSpwqJoVnOrLsBJWBFOJnvv-I0Eqyed~7DW-ozf6vNBMxH2eXQ6SG5Qzgd4F62MsFogBNDrR6xnKtsAAji4OPyw4czPyG4ACiZMOxbP6tt7bCf3H8M8jFEUrIRvEJK9h8zWPdZCuh1nil75LbEIYPrxQn-YsGrU70OihOHbcEthGWz6XuQK6oL2XrscNTg35RrMTQ5CqyLu3OwNij6Wruwv-prrU5wJm0R4tBk5cOLMXpdWFMdVqCeQlND9wpbldhbVuN4jeyVAKFsSUC0cFvc7ZkcQFq1b3IfSi1~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            }
            title={"Customize Your Products"}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15.755 14.255H14.965L14.685 13.985C15.665 12.845 16.255 11.365 16.255 9.755C16.255 6.165 13.345 3.255 9.755 3.255C6.165 3.255 3.255 6.165 3.255 9.755C3.255 13.345 6.165 16.255 9.755 16.255C11.365 16.255 12.845 15.665 13.985 14.685L14.255 14.965V15.755L19.255 20.745L20.745 19.255L15.755 14.255ZM9.755 14.255C7.26501 14.255 5.255 12.245 5.255 9.755C5.255 7.26501 7.26501 5.255 9.755 5.255C12.245 5.255 14.255 7.26501 14.255 9.755C14.255 12.245 12.245 14.255 9.755 14.255Z"
                  fill="#1C1C1C"
                />
              </svg>
            }
          />

          <ServicesComponent
            img={
              "https://s3-alpha-sig.figma.com/img/0c52/058c/7fecb736fb193ed3a0a046668cf87a58?Expires=1694390400&Signature=qSLtKjfKGM4KpC43TZbzwq3YMDxZihOX58KtJ0KPhL3jw0syYbH1xOmzr2PggbprY3jigR2WiFI3irMt~U4NeT-1So-QMnno9UjnScBeDEh8Q0~DQrm4p7pVDtfmurqNM9QPClHSMkj490X0fBZR95MuzUroLnjGh8HBCleZoVz3wSlSfMFCRg9m9nEsP30Pozu0xoin2p~SdGVxcMiqgaaNyGAH91rpgqNZbud-edP7C--t~XIZfHlWxOK87WiB14pkDuAe7z1zt0L~BDl4hRNTujZOUbOONcSPXqnFFPPdTrpyEiKniYsD5YkjXbOR8BoLI9T4VLSpdijcj2bPUg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            }
            title={"Product monitoring and inspection"}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z"
                  fill="#1C1C1C"
                />
              </svg>
            }
          />
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default Services;
