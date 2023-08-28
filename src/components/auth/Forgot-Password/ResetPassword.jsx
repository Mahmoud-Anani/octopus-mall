import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Copyright from "../../Copyright";
import { toast } from "react-toastify";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ResetPassword() {
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
    const formData = new FormData(event.currentTarget);
    const password = formData.get("newPassword") || "";
    const confirmPassword = formData.get("confirmPassword") || "";
    if (password === "" || confirmPassword === "") {
      setLoading(false);
      return setMainError("You must enter a new password and confirm");
    }
    const data = {
      password,
      confirmPassword,
    };
    await axios
      .put(
        `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/auth/resetPassword`,
        data
      )
      .then((res) => {
        setLoading(false);
        // Set Token
        if (res.data.send === "successful") {
          toast.success(`${res.data.message} 🎉`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return navigetor("/auth/sign-in");
        }
        return;
      })
      .catch((err) => {
        setLoading(false);
        const errors = err.response?.data || []; // Array of errors
        const notFoundUser = err.response.data?.message||'';
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
            New Password
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
              id="password"
              label="Password"
              name="newPassword"
              type="password"
              autoFocus
            />
            <TextField
              onChange={() => {
                setMainError("");
              }}
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
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
              Reset Password {loading && <div className="spinner ms-2"></div>}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
