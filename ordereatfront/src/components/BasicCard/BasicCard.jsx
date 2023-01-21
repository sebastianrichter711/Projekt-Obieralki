import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { cardStyles } from "../../styles/CardStyles";

const BasicCard = ({ header, content }) => {
  return <Card sx={cardStyles}>{header}</Card>;
};

export default BasicCard;
