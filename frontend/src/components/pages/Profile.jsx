import { Box, Avatar, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

// Styled components matching the visual style
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

const ProfileCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  border: '1px solid rgba(0, 0, 0, 0.08)',
}));

const ProfileItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5),
  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const Profile = () => {
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const [role, setRole] = useState([]);
  const [website, setWebsite] = useState([]);
  const [location, setLocation] = useState([]);
  // image state removed (unused)

  const { auth } = useAuth()
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const handleData = useCallback(async () => {
    await axios.get(`http://localhost:5000/profile/${auth.user}`).then(res => {
      console.log(JSON.stringify(res?.data[0]));
      setName(res?.data[0].name);
      setDescription(res?.data[0].description);
      setRole(res.data[0].role);
      setWebsite(res?.data[0].website);
      setLocation(res?.data[0].location);
      // setImage(res.data.image);
    })
  }, [auth.user]);

  useEffect(() => {
    handleData();
  }, [handleData]);

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
          {/* Back Button at the top
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
          </Box> */}

          {/* Header Section */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                margin: "0 auto 16px",
                backgroundColor: "#0F1B4C",
                fontSize: '2.5rem',
                fontWeight: 600,
                boxShadow: '0 8px 25px rgba(199, 233, 219, 0.4)',
              }}
            >
              {name[0]}
            </Avatar>
            <Typography
              component="h1"
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#0F1B4C",
                mb: 1,
              }}
            >
              {name || 'User Profile'}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#666",
                fontWeight: 500,
                fontSize: "1.1rem",
              }}
            >
              User Profile Details
            </Typography>
          </Box>

          {/* Profile Information Card */}
          <ProfileCard>
            <ProfileItem>
              <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                Username:
              </Typography>
              <Typography variant="body1" sx={{ color: '#0F1B4C', fontWeight: 600 }}>
                {auth.user}
              </Typography>
            </ProfileItem>

            <ProfileItem>
              <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                Role:
              </Typography>
              <Typography variant="body1" sx={{ color: '#0F1B4C', fontWeight: 600 }}>
                {role}
              </Typography>
            </ProfileItem>

            {description && (
              <ProfileItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="body1" sx={{ color: '#666', fontWeight: 500, mb: 1 }}>
                  Description:
                </Typography>
                <Typography variant="body2" sx={{ color: '#0F1B4C' }}>
                  {description}
                </Typography>
              </ProfileItem>
            )}

            {website && (
              <ProfileItem>
                <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                  Website:
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#0F1B4C', 
                    fontWeight: 600,
                    textDecoration: 'underline',
                    '&:hover': {
                      color: '#5f6da7ff',
                      cursor: 'pointer'
                    }
                  }}
                  onClick={() => window.open(website.startsWith('http') ? website : `https://${website}`, '_blank')}
                >
                  {website}
                </Typography>
              </ProfileItem>
            )}

            {location && (
              <ProfileItem>
                <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                  Location:
                </Typography>
                <Typography variant="body1" sx={{ color: '#0F1B4C', fontWeight: 600 }}>
                  {location}
                </Typography>
              </ProfileItem>
            )}
          </ProfileCard>

          {/* Action Buttons */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <GradientButton onClick={handleBack}>
              Back to Dashboard
            </GradientButton>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
              Profile Management • Anti-FakeProduct System
            </Typography>
          </Box>
        </GlassBox>
      </Container>
    </Box>
  );
}

export default Profile;


