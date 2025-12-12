import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// bgImg removed (unused)
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = '/auth';

// Updated with your color
const GlassBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  padding: theme.spacing(5),
  width: '100%',
  maxWidth: '420px',
  margin: '0 auto',
}));

// Updated button with your color
const GradientButton = styled(Button)(({ theme }) => ({
  background: '#0F1B4C', // Your color here
  color: '#ffffff', // Changed to black for better contrast
  padding: theme.spacing(1.5),
  borderRadius: '12px',
  fontWeight: 600,
  fontSize: '16px',
  textTransform: 'none',
  letterSpacing: '0.5px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#5f6da7ff', // Darker shade of your color
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(199, 233, 219, 0.4)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

// Updated text field with your color
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
      borderColor: '#0F1B4C', // Your color here
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0F1B4C', // Your color here
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(0, 0, 0, 0.6)',
    '&.Mui-focused': {
      color: '#0F1B4C', // Your color here
    },
  },
}));

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('user: ', user);
    console.log('pwd: ', pwd);

    try {
      const res = await axios.post(`${LOGIN_URL}/${user}/${pwd}`,
        {
          headers: { 'Content-Type': 'application/json' },
        });

      console.log(res?.data[0]);

      if (res?.data.length === 0) {
        setErrMsg('Login Failed. Please try again later.');
      } else {
        const role = res?.data[0].role;
        setAuth({ user, pwd, role });
        setUser('');
        setPwd('');
        navigate(`/${role}`, { replace: true });
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Server is down. Please try again later.');
      } else if (err.response?.status === 400) {
        setErrMsg('Invalid username or password.');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized access.');
      } else {
        setErrMsg('Login Failed. Please try again later.');
      }
      if (errRef.current) {
        try {
          errRef.current.focus();
        } catch (e) {
          // ignore focus errors
        }
      } else {
        // ensure focus after render if ref not yet attached
        try {
          if (typeof requestAnimationFrame !== 'undefined') {
            requestAnimationFrame(() => { try { errRef.current && errRef.current.focus(); } catch (e) {} });
          } else {
            setTimeout(() => { try { errRef.current && errRef.current.focus(); } catch (e) {} }, 0);
          }
        } catch (e) {
          // ignore
        }
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#c7e9dbff", // Your color as background
        padding: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Updated decorative background elements */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "#0F1B4C",
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
          zIndex: 0,
        }}
      />

      <Container component="main" maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <GlassBox>
          {/* Updated Logo Section */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "#0F1B4C", // Your color here
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: "0 8px 25px rgba(199, 233, 219, 0.4)",
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 40, color: "#ffffff" }} /> {/* Changed to black */}
            </Box>
            <Typography
              component="h1"
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#0F1B4C", // Changed to black
                mb: 1,
              }}
            >
              Anti-FakeProduct
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#666",
                fontWeight: 500,
                fontSize: "1.1rem",
              }}
            >
              Welcome back! Please login to continue.
            </Typography>
          </Box>

          {/* Error Message */}
          {errMsg && (
            <Box
              ref={errRef}
              sx={{
                backgroundColor: "rgba(244, 67, 54, 0.1)",
                border: "1px solid rgba(244, 67, 54, 0.2)",
                borderRadius: "12px",
                padding: "12px 16px",
                mb: 3,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" color="error" sx={{ fontWeight: 500 }}>
                {errMsg}
              </Typography>
            </Box>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <ModernTextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={(e) => setUser(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ color: "#0F1B4C" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <ModernTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 1 }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{
                      color: "#0F1B4C", // Your color here
                      '&.Mui-checked': {
                        color: "#0F1B4C", // Your color here
                      },
                    }}
                  />
                }
                label="Remember me"
                sx={{ color: "rgba(0, 0, 0, 0.7)" }}
              />
              <Button
                variant="text"
                sx={{
                  textTransform: "none",
                  color: "#0F1B4C", // Your color here
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  '&:hover': {
                    backgroundColor: "rgba(199, 233, 219, 0.1)",
                  },
                }}
              >
                Forgot password?
              </Button>
            </Box>

            <GradientButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 3 }}
            >
              Sign In
            </GradientButton>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Button
                onClick={handleBack}
                sx={{
                  textTransform: "none",
                  color: "#666",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  '&:hover': {
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    color: "#0F1B4C", // Your color here
                  },
                }}
              >
                ← Back to Home
              </Button>
            </Box>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
              Need help?{" "}
              <Button
                variant="text"
                sx={{
                  textTransform: "none",
                  color: "#0F1B4C", // Your color here
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  p: 0,
                  minWidth: "auto",
                  '&:hover': {
                    backgroundColor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                Contact Support
              </Button>
            </Typography>
          </Box>
        </GlassBox>
      </Container>
    </Box>
  );
}

