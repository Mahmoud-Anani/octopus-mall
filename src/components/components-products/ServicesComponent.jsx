import * as React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";

function ServicesComponent({ img, title, icon }) {
  return (
    <Box sx={{ maxWidth: 345, width: "100%", marginX: "auto" }}>
      <div className="relative bg-[#FFF] rounded-lg">
        <div className="absolute p-3 rounded-full border-1 z-10 bg-[#D1E7FF] right-3 top-[50%]">
          {icon}
        </div>
        <CardMedia
          component="img"
          height="140"
          className="h-32 opacity-75 hover:opacity-100 duration-200 rounded-t-lg"
          image={img}
          alt="green iguana"
        />
        <CardContent>
          <p className={`text-[#1C1C1C] text-base font-medium `}>{title}</p>
        </CardContent>
      </div>
    </Box>
  );
}

export default ServicesComponent;
