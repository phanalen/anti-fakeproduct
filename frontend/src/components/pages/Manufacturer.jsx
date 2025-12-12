import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button as MuiButton, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import '../../css/Role.css'; // Keeping your original CSS
import { Button } from '../Button'; // Keeping your original Button component

const getEthereumObject = () => window.ethereum;

const findMetaMaskAccount = async () => {
  try {
    const ethereum = getEthereumObject();

    if (!ethereum) {
      console.error("Make sure you have Metamask!");
      return null;
    }

    console.log("We have the Ethereum object", ethereum);
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      return account;
    } else {
      console.error("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Styled components for visual updates only
const StyledContainer = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#c7e9dbff",
  padding: 2,
  position: "relative",
  overflow: "hidden",
});

const GlassBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  padding: theme.spacing(5),
  width: '100%',
  maxWidth: '480px',
  margin: '0 auto',
  position: 'relative',
}));

const LogoutButton = styled(MuiButton)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '12px',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(1, 2.5),
  fontWeight: 500,
  fontSize: '0.875rem',
  textTransform: 'none',
  color: '#0F1B4C',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 1)',
    borderColor: '#0F1B4C',
    boxShadow: '0 4px 12px rgba(15, 27, 76, 0.1)',
  },
}));

const Manufacturer = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    findMetaMaskAccount().then((account) => {
      if (account !== null) {
        setCurrentAccount(account);
      }
    });
  }, []);

  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledContainer>
      {/* Decorative background elements */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "#0F1B4C",
          opacity: 0.05,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "#0F1B4C",
          opacity: 0.05,
          zIndex: 0,
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <GlassBox>
          {/* Logout Button at the top */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <LogoutButton href="/login" endIcon={<LogoutIcon />}>
                Logout
                </LogoutButton>
            </Box>

            {/* Title Section below logout button */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography
                component="h1"
                variant="h3"
                sx={{
                    fontWeight: 700,
                    color: "#0F1B4C",
                    mb: 1,
                }}
                >
                Manufacturer
                </Typography>
                <Typography
                variant="h6"
                sx={{
                    color: "#666",
                    fontWeight: 500,
                    fontSize: "1.1rem",
                }}
                >
                Welcome to your dashboard
                </Typography>
            </Box>


          {/* Wallet Status Display */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: '#0F1B4C', mb: 2, textDecoration: 'underline' }}>
              {currentAccount 
                ? `Connected: ${currentAccount.substring(0, 6)}...${currentAccount.substring(currentAccount.length - 4)}`
                : "Wallet not connected"}
            </Typography>
          </Box>

          {/* Your original buttons with their functionality */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: 'center' }}>
            <Link to="/profile" className="btn-link">
              <Button className="btns" buttonStyle='btn--long' buttonSize='btn--large'>
                Check Profile
              </Button>
            </Link>

            <Link to="/add-product" className="btn-link">
              <Button className="btns" buttonStyle='btn--long' buttonSize='btn--large'>
                Add Product
              </Button>
            </Link>

            {/* Connect Wallet Button - Original functionality */}
            {!currentAccount && (
              <Button 
                className="btns" 
                buttonStyle='btn--long' 
                buttonSize='btn--large' 
                onClick={connectWallet}
              >
                Connect Wallet
              </Button>
            )}
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
              Manufacturer Dashboard • Anti-FakeProduct System
            </Typography>
          </Box>
        </GlassBox>
      </Container>
    </StyledContainer>
  );
};

export default Manufacturer;


