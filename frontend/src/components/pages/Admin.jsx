import '../../css/Role.css'
import { LinkButton } from '../LinkButton';
import { Box, Button as Btn, Typography, Container } from '@mui/material';
import { styled } from "@mui/material/styles";
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

// Apply your glass morphism styling
const GlassBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  padding: theme.spacing(6),
  width: '100%',
  maxWidth: '500px',
  margin: '0 auto',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center everything horizontally
}));

// Styled logout button
const LogoutButton = styled(Btn)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  color: '#0F1B4C',
  borderRadius: '12px',
  padding: '8px 20px',
  fontWeight: 600,
  textTransform: 'none',
  border: '2px solid rgba(15, 27, 76, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#0F1B4C',
    color: '#ffffff',
    borderColor: '#0F1B4C',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(15, 27, 76, 0.2)',
  },
}));

// Styled admin icon
const AdminIcon = styled(Box)(({ theme }) => ({
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  background: '#0F1B4C',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px',
  boxShadow: '0 8px 25px rgba(15, 27, 76, 0.4)',
}));

// Custom styled button wrapper for LinkButton
const StyledButtonWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px', // Limit width for better centering
  margin: '0 auto',
  '& a': {
    textDecoration: 'none',
    display: 'block',
    width: '100%',
  },
  '& .btns': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    background: '#0F1B4C',
    color: '#ffffff',
    padding: '16px 24px',
    borderRadius: '12px',
    fontWeight: 600,
    fontSize: '16px',
    textTransform: 'none',
    letterSpacing: '0.5px',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    '&:hover': {
      background: '#5f6da7ff',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(15, 27, 76, 0.4)',
    },
    '& svg': {
      fontSize: '20px',
      flexShrink: 0, // Prevent icon from shrinking
    },
  },
}));

const Admin = () => {
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
         {/* Decorative background elements matching login */}
         <Box
           sx={{
             position: "absolute",
             top: "-10%",
             right: "-10%",
             width: "500px",
             height: "500px",
             borderRadius: "50%",
             background: "#0F1B4C",
             opacity: 0.1,
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
             opacity: 0.1,
             zIndex: 0,
           }}
         />

         <Container sx={{ position: "relative", zIndex: 2, justifyContent: 'center' }}>
           <GlassBox>
             {/* Admin Icon */}
             <AdminIcon>
               <AdminPanelSettingsIcon sx={{ fontSize: 50, color: "#ffffff" }} />
             </AdminIcon>

             {/* Welcome Section */}
             <Box sx={{ textAlign: "center", mb: 4, width: '100%' }}>
               <Typography
                 variant="h5"
                 sx={{
                   color: "#666",
                   fontWeight: 500,
                   mb: 1,
                 }}
               >
                 Welcome back,
               </Typography>
               <Typography
                 component="h1"
                 variant="h3"
                 sx={{
                   fontWeight: 700,
                   color: "#0F1B4C",
                   mb: 4,
                 }}
               >
                 ADMIN
               </Typography>
             </Box>

             {/* Action Buttons - Centered */}
             <Box sx={{ 
               display: "flex", 
               flexDirection: "column", 
               gap: 3, 
               mb: 4,
               width: '100%',
               alignItems: 'center', // Center the button containers
               justifyContent: 'center'
             }}>
               <StyledButtonWrapper>
                 <LinkButton 
                   to="/add-account" 
                   className="btns" 
                   buttonStyle='btn--long' 
                   buttonSize='btn--large'
                 >
                   <PersonAddIcon /> Add Account
                 </LinkButton>
               </StyledButtonWrapper>
               
               <StyledButtonWrapper>
                 <LinkButton 
                   to="/manage-account" 
                   className="btns" 
                   buttonStyle='btn--long' 
                   buttonSize='btn--large'
                 >
                   <ManageAccountsIcon /> Manage Accounts
                 </LinkButton>
               </StyledButtonWrapper>
             </Box>

             {/* Logout Button */}
             <Box sx={{ textAlign: "center", width: '100%' }}>
               <LogoutButton 
                 href="/login" 
                 endIcon={<LogoutIcon />}
               >
                 Logout
               </LogoutButton>
             </Box>
           </GlassBox>
         </Container>
       </Box>
   );
}

export default Admin;


