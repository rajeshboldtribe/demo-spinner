import React from "react";
import { Container } from "@mui/material";
import OfferSpinner from "../components/OfferSpinner";

const Home = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <OfferSpinner />
    </Container>
  );
};

export default Home;