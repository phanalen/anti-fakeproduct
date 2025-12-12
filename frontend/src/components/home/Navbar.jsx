import * as React from "react";
import Box from "@mui/material/Box";
import logoImg from "../../img/logo.png";
import { Container } from "@mui/system";
import CustomButton from "./CustomButton";
import { styled } from "@mui/material";
// useState import removed (no longer used)
import { Link } from "react-router-dom";

export const Navbar = () => {
  // mobileMenu state removed (unused)

  // mobile menu toggle removed (unused)

  const NavbarContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  }));

  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    width: "170px",
    height: "auto",
    [theme.breakpoints.down("md")]: {
      width: "120px",
      display: "block",
    },
  }));

  return (
    <NavbarContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <NavbarLogo src={logoImg} alt="Anti-FakeProduct." />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Link to="/login" style={{ textDecoration: 'none'}}>
          <CustomButton
            backgroundColor="#17275F"
            color="#fff"
            buttonText="Login"
            NavLink="/login"

          />
        </Link>
      </Box>
    </NavbarContainer>
  );
};

export default Navbar;
