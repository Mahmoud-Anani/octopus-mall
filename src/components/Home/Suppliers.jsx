import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";

const defaultTheme = createTheme();


function Suppliers() {
  // Handle Routes
  const navigetor = useNavigate();
  // Handle Data of user logged
  const [cookieToken, setCookieToken] = useCookies([
    "token",
    "remember",
    "slug",
    "role",
  ]);

  // Handle Error Data
  const [mainError, setMainError] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const handleSubmit = () => {};

    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component={"section"} maxWidth={"xl"}>
          <CssBaseline />
          <div
            className={`relative flex flex-wrap gap-10  bg-gradient-to-r overflow-hidden from-blue-600 to-blue-400 via-blue-500 rounded-lg shadow-lg`}
          >
            <div
              className={`absolute z-10 w-full h-full bg-[url('https://s3-alpha-sig.figma.com/img/4e80/e83f/e745e5ac4af0470ed5521db4af955316?Expires=1694390400&Signature=OsZ3D~XBElNzQ52eV-Sr7ERBVceyyteob8qrW0TMu-MVNu~DVuk~dNaud7mLemV2olimcu~Te7aJzP7RwY0ucjuck1Gt1Xh9DewJ9yFqstu0WZ~cvhPa8OsNztorOjc-hPHHkGLjqgzvQqduQNKywxuVzemOzk5z34nmJ90~2PmaL6p4BqZIq-6SHPoO~j~XWdOZx51VuK~rkCAOmyL79KHRfD-Mv7g9AIMhP8s~H3caXbMujEwpo~~i-nDKscsIiLFG2xomoQwrEr4669JyCawJhgsiJfmVCErMMtHCzmvti~juLwkbaomstuWgeukatHtQ20my9hlTbGgt7xQMMA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4')]`}
              style={{
                opacity: 0.7,
                backgroundBlendMode: "multiply",
              }}
            ></div>
            <div className={`z-20 p-10 flex gap-10`}>
              <div>
                <p className={`text-[#FFF] text-3xl font-semibold`}>
                  An easy way to send requests to all suppliers
                </p>
                <p className={`text-[#FFF] text-base font-normal`}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
              <div
                className={`bg-[#FFF] rounded-lg py-3 px-2 flex flex-col gap-2`}
              >
                <p className={`text-[#1C1C1C] text-xl font-semibold`}>
                  Send quote to suppliers
                </p>
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      onChange={() => {
                        setMainError("");
                      }}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      />
                    <TextField
                      onChange={() => {
                        setMainError("");
                      }}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <div
                      className={`bg-red-500 text-white rounded-t-lg rounded-b-lg text-center `}
                    >
                      {mainError}
                    </div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="remember"
                          name="rememberme"
                          color="primary"
                        />
                      }
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In {loading && <div className="spinner ms-2"></div>}
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <button
                          className={`text-blue-600 visited:text-purple-600 bg-transparent border-0 p-0 hover:text-blue-800`}
                          onClick={() => navigetor("/auth/forgot-password")}
                        >
                          Forgot password?
                        </button>
                      </Grid>
                      <Grid item>
                        <button
                          className={`text-blue-600 visited:text-purple-600 bg-transparent border-0 p-0 hover:text-blue-800`}
                          onClick={() => navigetor("/auth/sign-up")}
                        >
                          {"Don't have an account? Sign Up"}
                        </button>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </div>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    );
}

export default Suppliers;
