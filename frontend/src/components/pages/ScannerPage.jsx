import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
// ArrowBackIcon removed (unused)
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import QrScanner from '../QrScanner';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

// Styled components
const GlassBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: '500px',
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

const ScannerContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3),
  border: '1px solid rgba(0, 0, 0, 0.08)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '300px',
}));

const ScannerPage = () => {
  const CONTRACT_ADDRESS  = '0x62081f016446585cCC507528cc785980296b4Ccd';
  const [qrData, setQrData] = useState('');

  const { auth } = useAuth();
  const navigate = useNavigate();
  
  const passData = (data) => {
    setQrData(data);
    console.log("qrdata 1: ", qrData);
  };

  useEffect(() => {
    console.log("auth: ", auth);
    console.log("qrdata 2: ", qrData);

    const arr = qrData.split(",");
    const contractAddress = arr[0];

    if (contractAddress) {
      if (contractAddress === CONTRACT_ADDRESS) {
        if (auth.role === "supplier" || auth.role === "retailer") {
          navigate('/update-product', { state: { qrData } });
        } else {
          navigate('/authentic-product', { state: { qrData } });
        }
      } else {
        navigate('/fake-product');
      }
    }
  }, [qrData, auth, navigate]);

  // navigation helpers were inlined in the effect above

  const handleBack = () => {
    navigate(-1)
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
              <QrCodeScannerIcon sx={{ fontSize: 40, color: "#ffffff" }} />
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
              Scan QR Code
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#666",
                fontWeight: 500,
                fontSize: "1.1rem",
              }}
            >
              Position the QR code within the scanner frame
            </Typography>
          </Box>

          {/* Scanner Section */}
          <ScannerContainer>
            <QrScanner passData={passData} />
          </ScannerContainer>

          {/* Instructions */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body2" sx={{ color: '#666', textAlign: 'center', mb: 1 }}>
              <strong>Role-based actions:</strong>
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(0, 0, 0, 0.6)', display: 'block', textAlign: 'center' }}>
              • Supplier/Retailer: Update product details
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(0, 0, 0, 0.6)', display: 'block', textAlign: 'center' }}>
              • Consumer: View product authenticity
            </Typography>
          </Box>

          {/* Back Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <GradientButton onClick={handleBack}>
              Back to Dashboard
            </GradientButton>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
              QR Scanner • Anti-FakeProduct System
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(0, 0, 0, 0.4)", mt: 1, display: 'block' }}>
              Ensure good lighting and steady camera for best results
            </Typography>
          </Box>
        </GlassBox>
      </Container>
    </Box>
  );
}

export default ScannerPage;


