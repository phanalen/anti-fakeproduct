import { Box, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Navbar from "./Navbar";
// bgImg and heroImg removed (unused)
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";


const Hero = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#17275F",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box sx={{ backgroundColor: "#e0f1eaff", minHeight: "95vh", flexGrow: 1, width: "100%", overflow: "hidden" }}>
      <Container sx={{ padding: { xs: 3, sm: 1, md: 2, lg: 2 } }}>
        <Navbar />
        <CustomBox>
          <Box sx={{ flex: "2" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",
                mt: 1,
                mb: 4,
              }}
            >

              Welcome to Anti-FakeProduct
            </Typography>
            <Title variant="h1">
              Securely Authenticate Your Products with Anti-FakeProduct blockchain technology
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
            >
              Our blockchain-based product identification system provides a secure and reliable way to authenticate your products and protect against fraud
            </Typography>
            <Link to="/scanner">

              <CustomButton
                backgroundColor="#17275F"
                color="#ffff"
                buttonText="Scan QR"
                heroBtn={true}
              />
            </Link>
          </Box>

        
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;
