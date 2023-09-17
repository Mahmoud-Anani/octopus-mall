import { Link, Typography } from "@mui/material";

export default function Copyright(props) {
  return (
    <Typography
      className="my-3"
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © Mahmoud Abdullah "}
      <Link color="inherit" href="https://mahmoud-abdullah-anani.vercel.app/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
