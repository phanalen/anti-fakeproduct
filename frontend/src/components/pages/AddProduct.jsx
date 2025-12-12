import { Box, Typography, Container, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TextField, Button } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { ethers } from "ethers";
import axios from 'axios';
import abi from '../../utils/Identeefi.json';
import QRCode from 'qrcode.react';
import dayjs from 'dayjs';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { setKey, fromLatLng } from 'react-geocode';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';

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
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(0, 0, 0, 0.6)',
    '&.Mui-focused': {
      color: '#0F1B4C',
    },
  },
}));

const UploadButton = styled(Button)(({ theme }) => ({
  border: '2px dashed rgba(15, 27, 76, 0.3)',
  borderRadius: '12px',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(199, 233, 219, 0.1)',
  color: '#0F1B4C',
  textTransform: 'none',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: 'rgba(199, 233, 219, 0.2)',
    borderColor: '#0F1B4C',
  },
}));

const LoadingMessage = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(199, 233, 219, 0.2)',
  border: '1px solid rgba(199, 233, 219, 0.5)',
  borderRadius: '12px',
  padding: theme.spacing(2),
  textAlign: 'center',
  marginTop: theme.spacing(2),
}));

// All your existing functions and logic remain exactly the same...
const getEthereumObject = () => window.ethereum;

const findMetaMaskAccount = async () => {
  try {
    const ethereum = getEthereumObject();
    if (!ethereum) {
      console.error("Make sure you have Metamask!");
      alert("Make sure you have Metamask!");
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

const AddProduct = () => {
  // All your existing state and logic remains exactly the same...
  // currentAccount removed (was unused)
  const [serialNumber, setSerialNumber] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState({
    file: [],
    filepreview: null
  });
  const [qrData, setQrData] = useState('');
  const [manuDate, setManuDate] = useState('');
  const [manuLatitude, setManuLatitude] = useState("");
  const [manuLongtitude, setManuLongtitude] = useState("");
  const [manuName, setManuName] = useState("");
  const [loading, setLoading] = useState("");
  const [manuLocation, setManuLocation] = useState("");
  const [isUnique, setIsUnique] = useState(true);

  const CONTRACT_ADDRESS  = '0x62081f016446585cCC507528cc785980296b4Ccd';
  const contractABI = abi.abi;
  const { auth } = useAuth();
  const navigate = useNavigate();

  const getUsername = useCallback(async () => {
    const response = await axios.get(`http://localhost:5000/profile/${auth.user}`);
    console.log(JSON.stringify(response?.data[0]));
    setManuName(response?.data[0].name);
  }, [auth.user]);

  const getCurrentTimeLocation = useCallback(() => {
    setManuDate(dayjs().unix())
    navigator.geolocation.getCurrentPosition(function(position) {
      setManuLatitude(position.coords.latitude);
      setManuLongtitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    // ensure metamask is present; account value is not used in this component
    findMetaMaskAccount();
    getUsername();
    getCurrentTimeLocation();
  }, [getUsername, getCurrentTimeLocation]);

  useEffect(() => {
    setKey('AIzaSyB5MSbxR9Vuj1pPeGvexGvQ3wUel4znfYY')
    
    fromLatLng(manuLatitude, manuLongtitude).then(
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
        setManuLocation(address.replace(/,/g, ';'));
        console.log("city, state, country: ", city, state, country);
        console.log("address:", address);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [manuLatitude, manuLongtitude]);

  const generateQRCode = async (serialNumber) => {
    const data = CONTRACT_ADDRESS + ',' + serialNumber
    setQrData(data);
    console.log("QR Code: ", qrData);
  }

  const downloadQR = () => {
    const canvas = document.getElementById("QRCode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${serialNumber}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleBack = () => {
    navigate(-1)
  }

  const handleImage = async (e) => {
    setImage({
      ...image,
      file: e.target.files[0],
      filepreview: URL.createObjectURL(e.target.files[0])
    })
  }

  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("image", image.file);

    axios.post("http://localhost:5000/upload/product", data, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(res => {
      console.log(res);
      if (res.data.success === 1) {
        console.log("image uploaded");
      }
    })
  }

  const registerProduct = async (e) => {
    e.preventDefault();

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const productContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

        console.log("here");
        const registerTxn = await productContract.registerProduct(name, brand, serialNumber, description.replace(/,/g, ';'), image.file.name, manuName, manuLocation, manuDate.toString());
        console.log("Mining (Registering Product) ...", registerTxn.hash);
        setLoading("Mining (Register Product) ..." + registerTxn.hash);

        await registerTxn.wait();
        console.log("Mined (Register Product) --", registerTxn.hash);
        setLoading("Mined (Register Product) --" + registerTxn.hash);

        generateQRCode(serialNumber);
        const product = await productContract.getProduct(serialNumber);
        console.log("Retrieved product...", product);
        setLoading("");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  

  const addProductDB = async (e) => {
    try {
      const profileData = JSON.stringify({
        "serialNumber": serialNumber,
        "name": name,
        "brand": brand,
      });

      const res = await axios.post('http://localhost:5000/addproduct', profileData,
        {
          headers: {'Content-Type': 'application/json'},
        });
      
      console.log(JSON.stringify(res.data));
    } catch (err) {
      console.log(err);
    }
  }

  const checkUnique = async () => {
    const res = await axios.get("http://localhost:5000/product/serialNumber");
    const existingSerialNumbers = res.data.map((product) => product.serialnumber);
    existingSerialNumbers.push(serialNumber);
    
    const duplicates = existingSerialNumbers.filter((item, index) => existingSerialNumbers.indexOf(item) !== index)
    console.log("duplicates: ", duplicates)
    const isDuplicate = duplicates.length >= 1;
    setIsUnique(!isDuplicate);  
    console.log(existingSerialNumbers)
    console.log("isUnique: ", isUnique)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("..............................");
    console.log("name: ", name);
    console.log("brand: ", brand);
    console.log("description: ", description);
    console.log("image: ", image.file.name);
    console.log("serialNumber: ", serialNumber);
    console.log("manufacture date: ", manuDate);
    console.log("manufactured at: ", manuLocation);
    console.log("manufactured by: ", manuName);

    checkUnique();

    if(isUnique){
      uploadImage(image);
      addProductDB(e);
      setLoading("Please pay the transaction fee to update the product details...")
      await registerProduct(e);
    }

    setIsUnique(true);
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
              Back to Dashboard
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
              <AddCircleOutlineIcon sx={{ fontSize: 40, color: "#ffffff" }} />
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
              Add New Product
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#666",
                fontWeight: 500,
                fontSize: "1.1rem",
              }}
            >
              Register your product on the blockchain
            </Typography>
          </Box>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <ModernTextField
              fullWidth
              error={!isUnique}
              helperText={!isUnique ? "Serial Number already exists" : ""}
              margin="normal"
              label="Serial Number"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              required
            />
            
            <ModernTextField
              fullWidth
              margin="normal"
              label="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <ModernTextField
              fullWidth
              margin="normal"
              label="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />

            <ModernTextField
              fullWidth
              margin="normal"
              label="Description"
              multiline
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            {/* Image Upload */}
            <UploadButton
              component="label"
              fullWidth
              startIcon={<UploadIcon />}
              sx={{ mt: 2, mb: 2 }}
            >
              Upload Product Image
              <input
                type="file"
                hidden
                onChange={handleImage}
              />
            </UploadButton>

            {image.filepreview && (
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Avatar
                  src={image.filepreview}
                  alt="Preview"
                  sx={{
                    width: 120,
                    height: 120,
                    margin: '0 auto',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </Box>
            )}

            {/* QR Code Display */}
            {qrData && (
              <Box sx={{ textAlign: 'center', mt: 3, mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#0F1B4C', mb: 2, fontWeight: 600 }}>
                  QR Code Generated
                </Typography>
                <QRCode
                  value={qrData}
                  id="QRCode"
                  size={180}
                />
                <GradientButton
                  startIcon={<DownloadIcon />}
                  onClick={downloadQR}
                  sx={{ mt: 2 }}
                >
                  Download QR Code
                </GradientButton>
              </Box>
            )}

            {/* Loading Message */}
            {loading && (
              <LoadingMessage>
                <Typography variant="body2" sx={{ color: '#0F1B4C', fontWeight: 500 }}>
                  {loading}
                </Typography>
              </LoadingMessage>
            )}

            {/* Submit Button */}
            <GradientButton
              type="submit"
              fullWidth
              sx={{ mt: 3 }}
              onClick={getCurrentTimeLocation}
            >
              Register Product on Blockchain
            </GradientButton>

            {/* Footer */}
            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
                Connected as: <strong style={{ color: "#0F1B4C" }}>{auth.user}</strong>
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(0, 0, 0, 0.4)", mt: 1, display: 'block' }}>
                Product registration requires blockchain transaction confirmation
              </Typography>
            </Box>
          </form>
        </GlassBox>
      </Container>
    </Box>
  );
}

export default AddProduct;


