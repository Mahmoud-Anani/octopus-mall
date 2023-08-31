import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../Copyright";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  // Handle Errors
  const [mainError, setMainError] = React.useState("");

  // Handle Routes
  const navigetor = useNavigate();

  //   handle loadings
  const [loading, setLoading] = React.useState(false);

  // Handle Data of user logged
  const [, setCookieToken, removeCookieToken] = useCookies([
    "token",
    "remember",
    "slug",
    "role",
  ]);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rememberme = formData.get("rememberme") || "";
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      name: formData.get("firstName") + " " + formData.get("lastName"),
    };
    if (
      data.email === "" ||
      data.password === "" ||
      data.confirmPassword === "" ||
      formData.get("firstName") === "" ||
      formData.get("lastName") === ""
    ) {
      setLoading(false);
      return setMainError("You must enter your all data");
    }
    await axios
      .post(`${import.meta.env.VITE_DOMAIN_NAME}/api/v1/auth/signup`, data)
      .then((res) => {
        removeCookieToken("token");
        removeCookieToken("remember");
        setLoading(false);
        // Set Token
        navigetor("/");
        rememberme.length > 1
          ? setCookieToken("remember", `true`, { path: "/" })
          : setCookieToken("remember", `false`, { path: "/" });
        // set basecs data
        setCookieToken("token", `Bearer ${res.data.token}`, { path: "/" });
        setCookieToken("slug", `${res.data.data.slug}`, { path: "/" });
        setCookieToken("role", `${res.data.data.role}`, { path: "/" });
        setCookieToken("userImg", `${res.data.data.userImg}`, { path: "/" });
        setCookieToken("_id", `${res.data.data._id.tostring()}`, {
          path: "/",
        });
      })
      .catch((err) => {
        setLoading(false);
        const errors = err.response?.data || []; // Array of errors
        const notFoundUser = err.response.data?.message;
        if (errors.errors) {
          errors.errors.map((error) => setMainError(`${error.msg}`));
        } else {
          setMainError(`${notFoundUser}`);
        }
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={() => {
                    setMainError("");
                  }}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={() => {
                    setMainError("");
                  }}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={() => {
                    setMainError("");
                  }}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={() => {
                    setMainError("");
                  }}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={() => {
                    setMainError("");
                  }}
                  required
                  fullWidth
                  name="confirmPassword"
                  label="confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-confirmPassword"
                />
              </Grid>

              <Grid item xs={12}>
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
              </Grid>
            </Grid>
            <div
              className={`bg-red-500 text-white rounded-t-lg rounded-b-lg text-center `}
            >
              {mainError}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up {loading && <div className="spinner ms-2"></div>}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <button
                  className={`text-blue-600 visited:text-purple-600 bg-transparent border-0 hover:text-blue-800 p-0`}
                  onClick={() => navigetor("/auth/sign-in")}
                >
                  Already have an account? Sign in
                </button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
