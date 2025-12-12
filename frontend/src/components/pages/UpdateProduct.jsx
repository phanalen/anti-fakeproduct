import { Box, Avatar, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UpdateIcon from '@mui/icons-material/Update';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import abi from '../../utils/Identeefi.json';
import { useEffect, useState, useCallback } from 'react';
// useAuth import removed (not used in this component)
import { ethers } from "ethers";
// axios import removed (unused)

// Styled components
const GlassBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: '600px',
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

const ProductCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  border: '1px solid rgba(0, 0, 0, 0.08)',
}));

const LoadingMessage = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(199, 233, 219, 0.2)',
  border: '1px solid rgba(199, 233, 219, 0.5)',
  borderRadius: '12px',
  padding: theme.spacing(2),
  textAlign: 'center',
  marginTop: theme.spacing(2),
}));

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

const UpdateProduct = () => {
  // All your existing state and logic remains exactly the same...
  const loading = "";
  const [serialNumber, setSerialNumber] = useState("");
  const [name, setName] = useState("P");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [history, setHistory] = useState([]);
  const [isSold, setIsSold] = useState(false);
  const [image, setImage] = useState({
    file: [],
    filepreview: null
  });

  const CONTRACT_ADDRESS = '0x62081f016446585cCC507528cc785980296b4Ccd';
  const CONTRACT_ABI = abi.abi;
  // auth not used here
  const navigate = useNavigate();
  const location = useLocation();
  const qrData = location.state?.qrData;

  console.log("qrData", qrData);

  const getImageCb = useCallback(async (imageName) => {
    setImage(prevState => ({
      ...prevState,
      filepreview: `http://localhost:5000/file/product/${imageName}`
    }));
  }, []);

  const setData = useCallback((d) => {
    console.log("product data: ", d);
    const arr = d.split(",");
    console.log("arr", arr)

    setName(arr[1]);
    setBrand(arr[2]);
    setDescription(arr[3].replace(/;/g, ","));
    getImageCb(arr[4]);

    const hist = [];
    let start = 5;

    for (let i = 5; i < arr.length; i += 5) {
      const actor = arr[start + 1];
      const location = arr[start + 2].replace(/;/g, ",");
      const timestamp = arr[start + 3];
      const isSold = arr[start + 4] === "true" ? setIsSold(true) : false;

      hist.push({
        actor, location, timestamp, isSold
      });
      start += 5;
    }
    console.log("hist", hist)
    setHistory(hist);
  }, [getImageCb]);

  const handleScan = useCallback(async (qrData) => {
    const data = qrData.split(",");
    const contractAddress = data[0];
    setSerialNumber(data[1]);

    console.log("contract address", contractAddress)
    console.log("serial number", data[1])

    if (contractAddress === CONTRACT_ADDRESS) {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const productContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

          const product = await productContract.getProduct(data[1].toString());
          console.log("Retrieved product...", product);
          setData(product.toString())
        } else {
          console.log("Ethereum object doesn't exist!");
          alert("Ethereum object doesn't exist! Please connect your wallet first!")
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [CONTRACT_ADDRESS, CONTRACT_ABI, setData]);

  useEffect(() => {
    console.log("useEffect 1")
    // ensure metamask is present; don't store account if unused
    findMetaMaskAccount();

    if (qrData) {
      handleScan(qrData)
    }
  }, [qrData, handleScan]);

  const handleBack = () => {
    navigate(-1)
  }

  const getHistory = () => {
    return history.map((item, index) => {
      const date = dayjs(item.timestamp * 1000).format('MM/DD/YYYY');
      const time = dayjs(item.timestamp * 1000).format('HH:mm a');

      return (
        <TimelineItem key={index}>
          <TimelineOppositeContent color="textSecondary">
            {time} {date}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography>Location: {item.location}</Typography>
            <Typography>Actor: {item.actor}</Typography>
          </TimelineContent>
        </TimelineItem>
      );
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/update-product-details', { state: { qrData }});
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

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
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
              Back to Scanner
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
              <UpdateIcon sx={{ fontSize: 40, color: "#ffffff" }} />
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
              Update Product
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#666",
                fontWeight: 500,
                fontSize: "1.1rem",
              }}
            >
              Review product details before updating
            </Typography>
          </Box>

          {/* Product Information Card */}
          <ProductCard>
            <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
              <Avatar
                alt={name}
                src={image.filepreview}
                sx={{
                  width: 120,
                  height: 120,
                  backgroundColor: "#0F1B4C",
                  fontSize: '2rem',
                  fontWeight: 600,
                  boxShadow: '0 8px 25px rgba(199, 233, 219, 0.4)',
                }}
              >
                {name[0]}
              </Avatar>
              
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ color: '#0F1B4C', fontWeight: 600, mb: 1 }}>
                  {name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                  <strong>Serial Number:</strong> {serialNumber}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                  <strong>Description:</strong> {description}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  <strong>Brand:</strong> {brand}
                </Typography>
              </Box>
            </Box>

            {/* Product Timeline */}
            <Typography variant="h6" sx={{ color: '#0F1B4C', fontWeight: 600, mb: 2 }}>
              Product History
            </Typography>
            
            <Box sx={{ maxHeight: '250px', overflowY: 'auto', pr: 1 }}>
              <Timeline
                sx={{
                  [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.3,
                  },
                  '& .MuiTimelineContent-root': {
                    flex: 0.7,
                  }
                }}
              >
                {getHistory()}
                <TimelineItem>
                  <TimelineOppositeContent color="textSecondary">
                    {dayjs().format('HH:mm a')} {dayjs().format('MM/DD/YYYY')}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography>
                      <strong>Status:</strong> {isSold ? 'Sold' : 'Available'}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </Box>
          </ProductCard>

          {/* Loading Message */}
          {loading && (
            <LoadingMessage sx={{ mt: 3 }}>
              <Typography variant="body2" sx={{ color: '#0F1B4C', fontWeight: 500 }}>
                {loading}
              </Typography>
            </LoadingMessage>
          )}

          {/* Update Button */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <GradientButton
              onClick={handleSubmit}
              startIcon={<UpdateIcon />}
            >
              Proceed to Update
            </GradientButton>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
              Product Update • Anti-FakeProduct System
            </Typography>
          </Box>
        </GlassBox>
      </Container>
    </Box>
  );
}

export default UpdateProduct;


