import { Box, Typography, Button, Container, Autocomplete } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import useAuth from '../../hooks/useAuth';
import { ethers } from "ethers";
import axios from 'axios';
import { setKey, fromLatLng } from 'react-geocode';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import abi from '../../utils/Identeefi.json';

// Styled components
const GlassBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: '520px',
  margin: '0 auto',
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: '#0F1B4C',
  color: '#ffffff',
  padding: theme.spacing(1.5, 3),
  borderRadius: '12px',
  fontWeight: 600,
  fontSize: '15px',
  textTransform: 'none',
  letterSpacing: '0.5px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#5f6da7ff',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(199, 233, 219, 0.4)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

const ModernTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transition: 'all 0.3s ease',
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.08)',
      borderWidth: '2px',
    },
    '&:hover fieldset': {
      borderColor: '#0F1B4C',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0F1B4C',
      borderWidth: '2px',
    },
    '&.Mui-disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(0, 0, 0, 0.6)',
    '&.Mui-focused': {
      color: '#0F1B4C',
    },
  },
}));

const LoadingMessage = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(199, 233, 219, 0.2)',
  border: '1px solid rgba(199, 233, 219, 0.5)',
  borderRadius: '12px',
  padding: theme.spacing(2),
  textAlign: 'center',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const FormCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  border: '1px solid rgba(0, 0, 0, 0.08)',
}));

const options = ["true", "false"];

// All your existing functions remain exactly the same
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

const UpdateProductDetails = () => {
  // All your existing state and logic remains exactly the same...
  // currentAccount removed (unused)
  const [currDate, setCurrDate] = useState('');
  const [currLatitude, setCurrLatitude] = useState("");
  const [currLongtitude, setCurrLongtitude] = useState("");
  const [currName, setCurrName] = useState("");
  const [currLocation, setCurrLocation] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [isSold, setIsSold] = useState(false);
  const [loading, setLoading] = useState("");

  const CONTRACT_ADDRESS = '0x62081f016446585cCC507528cc785980296b4Ccd';
  const CONTRACT_ABI = abi.abi;
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const qrData = location.state?.qrData;

  useEffect(() => {
    if (!qrData) return;
    console.log("qrdata", qrData)
    const data = qrData.split(",");
    setSerialNumber(data[1]);
    console.log("serialNumber", data[1])

    // ensure metamask is present; we don't store the account here
    findMetaMaskAccount();
  }, [qrData]);

  const getUsername = useCallback(async () => {
    const response = await axios.get(`http://localhost:5000/profile/${auth.user}`);
    console.log(JSON.stringify(response?.data[0]));
    setCurrName(response?.data[0].name);
  }, [auth.user]);

  const getCurrentTimeLocation = useCallback(() => {
    setCurrDate(dayjs().unix())
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrLatitude(position.coords.latitude);
      setCurrLongtitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    getUsername();
    getCurrentTimeLocation();
  }, [getUsername, getCurrentTimeLocation]);

  useEffect(() => {
    setKey('AIzaSyB5MSbxR9Vuj1pPeGvexGvQ3wUel4znfYY')
    
    fromLatLng(currLatitude, currLongtitude).then(
      (response) => {
        const address = response.results[0].formatted_address;
        let city, state, country;
        for (let i = 0; i < response.results[0].address_components.length; i++) {
          for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
              default:
                break;
            }
          }
        }
        
        setCurrLocation(address.replace(/,/g, ';'));
        console.log("city, state, country: ", city, state, country);
        console.log("address:", address);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [currLatitude, currLongtitude]);

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const productContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        console.log("here");
        const registerTxn = await productContract.addProductHistory(serialNumber, currName, currLocation, currDate.toString(), Boolean(isSold));
        console.log("Mining (Adding Product History) ...", registerTxn.hash);
        setLoading("Mining (Add Product History) ..." + registerTxn.hash);

        await registerTxn.wait();
        console.log("Mined (Add Product History) --", registerTxn.hash);
        setLoading("Mined (Add Product History) --" + registerTxn.hash);

        const product = await productContract.getProduct(serialNumber);
        console.log("Retrieved product...", product);
        setLoading("Done! Product details updated successfully!");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("here");
    setLoading("Please pay the transaction fee to update the product details...");
    await updateProduct(e);
  }

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#c7e9dbff",
        padding: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
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
          {/* Back Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <Button
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
              sx={{
                textTransform: 'none',
                color: '#0F1B4C',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(15, 27, 76, 0.05)',
                },
              }}
            >
              Back to Product
            </Button>
          </Box>

          {/* Header Section */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "#0F1B4C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: "0 8px 25px rgba(199, 233, 219, 0.4)",
              }}
            >
              <EditIcon sx={{ fontSize: 40, color: "#ffffff" }} />
            </Box>
            <Typography
              component="h1"
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#0F1B4C",
                mb: 1,
              }}
            >
              Update Details
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#666",
                fontWeight: 500,
                fontSize: "1.1rem",
              }}
            >
              Add new product history entry
            </Typography>
          </Box>

          {/* Form Card */}
          <FormCard>
            <ModernTextField
              fullWidth
              margin="normal"
              label="Serial Number"
              disabled
              value={serialNumber}
            />
            
            <ModernTextField
              fullWidth
              margin="normal"
              label="Your Name"
              disabled
              value={currName}
            />
            
            <ModernTextField
              fullWidth
              margin="normal"
              label="Current Location"
              disabled
              multiline
              minRows={2}
              value={currLocation.replace(/;/g, ",")}
            />
            
            <ModernTextField
              fullWidth
              margin="normal"
              label="Date & Time"
              disabled
              value={dayjs(currDate * 1000).format("MMMM D, YYYY h:mm A")}
            />

            {/* Is Sold Field (only for retailers) */}
            {auth.role !== "supplier" && (
              <Autocomplete
                disablePortal
                id="is-sold-select"
                options={options}
                fullWidth
                value={isSold}
                onChange={(event, newVal) => {
                  setIsSold(newVal);
                }}
                sx={{ mt: 2 }}
                renderInput={(params) => (
                  <ModernTextField
                    {...params}
                    margin="normal"
                    label="Is Sold?"
                    variant="outlined"
                    required
                  />
                )}
              />
            )}
          </FormCard>

          {/* Loading Message */}
          {loading && (
            <LoadingMessage>
              <Typography variant="body2" sx={{ color: '#0F1B4C', fontWeight: 500 }}>
                {loading}
              </Typography>
            </LoadingMessage>
          )}

          {/* Action Buttons */}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <GradientButton onClick={handleSubmit} startIcon={<EditIcon />}>
              Update on Blockchain
            </GradientButton>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
              Connected as: <strong style={{ color: "#0F1B4C" }}>{auth.role}</strong>
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(0, 0, 0, 0.4)", mt: 1, display: 'block' }}>
              This update will be permanently recorded on the blockchain
            </Typography>
          </Box>
        </GlassBox>
      </Container>
    </Box>
  );
}

export default UpdateProductDetails;


