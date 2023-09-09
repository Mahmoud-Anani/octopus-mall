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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Copyright from "../Copyright";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  // Handle Routes
  const navigetor = useNavigate();

  // Handle Data of user logged
  const [cookieToken, setCookieToken] = useCookies([
    "token",
    "remember",
    "slug",
    "role",
  ]);
  React.useEffect(() => {
    cookieToken.token !== undefined && navigetor("/");
  }, [cookieToken]);

  // Handle Error Data
  const [mainError, setMainError] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const email = data.get("email").trim() || "";
    const password = data.get("password").trim() || "";
    const rememberme = data.get("rememberme") || "";
    if (email === "" || password === "") {
      setLoading(false);
      return setMainError("You must enter your email and password");
    }
    await axios
      .post(`${import.meta.env.VITE_DOMAIN_NAME}/api/v1/auth/signin`, {
        email,
        password,
      })
      .then((res) => {
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
          setCookieToken("_id", `${res.data.data._id}`, {
            path: "/",
          });
          setCookieToken(
            "userImg",
            { userImg: res.data.data.userImg },
            { path: "/" }
          );
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              disabled={loading}
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
              autoFocus
            />
            <TextField
              disabled={loading}
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
                <Checkbox value="remember" name="rememberme" color="primary" />
              }
              label="Remember me"
            />
            <Button
              disabled={loading}
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
        <Copyright sx={{ mt: 5, mb: 2 }} />
      </Container>
    </ThemeProvider>
  );
}
