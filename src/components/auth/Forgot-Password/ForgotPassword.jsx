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
import Copyright from "../../Copyright";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ForgotPassword() {
  // Handle Routes
  const navigetor = useNavigate();
  // Handle Data of user logged
  const [cookieToken] = useCookies(["token", "remember"]);
  React.useEffect(() => {
    cookieToken.token !== undefined && navigetor("/");
  }, [cookieToken]);
  // Handle Error Data
  const [mainError, setMainError] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const email = data.get("email") || "";
    if (email === "") {
      setLoading(false);
      return setMainError("You must enter your email");
    }
    await axios
      .post(`${import.meta.env.VITE_DOMAIN_NAME}/api/v1/auth/forgotPassword`, {
        email,
      })
      .then((res) => {
        setLoading(false);
        // Set Token
        if (res.data.send === "successful") {
          return navigetor("/auth/forgot-password/verify-code");
        }
        return;
      })
      .catch((err) => {
        setLoading(false);
        const errors = err.response?.data || []; // Array of errors
        const notFoundUser = err.response.data?.message;
        // Handle sigle error or many errors
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
            Forgot Password
          </Typography>
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
              autoFocus
            />
            <div
              className={`bg-red-500 text-white rounded-t-lg rounded-b-lg  `}
            >
              {mainError}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Code {loading && <div className="spinner ms-2"></div>}
            </Button>
            <Grid container>
              <Grid item xs>
                <button
                  className={`text-blue-600 visited:text-purple-600 bg-transparent border-0 p-0 hover:text-blue-800`}
                  onClick={() => navigetor("/auth/sign-in")}
                >
                  {"Already have an account? Sign in"}
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
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
