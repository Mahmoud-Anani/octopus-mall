import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";

function ServicesComponent({ img, title, icon }) {
  return (
    <Box sx={{ maxWidth: 345, width: "100%", marginX: "auto" }}>
      <CardActionArea className="relative ">
        <div className="absolute p-3 rounded-full border-1 z-20 bg-[#D1E7FF] right-3 top-[50%]">
          {icon}
        </div>
        <CardMedia
          component="img"
          height="140"
          className="h-32 opacity-50 "
          image={img}
          alt="green iguana"
        />
        <CardContent>
          <p className={`text-[#1C1C1C] text-base font-medium `}>{title}</p>
        </CardContent>
      </CardActionArea>
    </Box>
  );
}

export default ServicesComponent;
