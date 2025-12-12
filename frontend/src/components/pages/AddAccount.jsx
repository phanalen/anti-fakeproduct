import '../../css/Role.css'
import { TextField, Box, Typography, Autocomplete, Button, Container } from '@mui/material';
import { styled } from "@mui/material/styles";
import React from 'react'
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';

const options = ["manufacturer", "supplier", "retailer"]

// Apply your glass morphism styling
const GlassBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  padding: theme.spacing(5),
  width: '100%',
  maxWidth: '500px',
  margin: '0 auto',
}));

// Apply your button styling
const GradientButton = styled(Button)(({ theme }) => ({
  background: '#0F1B4C',
  color: '#ffffff',
  padding: theme.spacing(1.5),
  borderRadius: '12px',
  fontWeight: 600,
  fontSize: '16px',
  textTransform: 'none',
  letterSpacing: '0.5px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#5f6da7ff',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(15, 27, 76, 0.4)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

// Styled back button
const BackButton = styled(Button)(({ theme }) => ({
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

const AddAccount = () => {
   const [user, setUser] = useState('');
   const [pwd, setPwd] = useState('');
   const [pwd2, setPwd2] = useState('');
   const [role, setRole] = React.useState(options[0])
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [website, setWebsite] = useState('');
   const [location, setLocation] = useState('');
   const [errMsg, setErrMsg] = useState('');
   const [image, setImage] = useState({
       file: [],
       filepreview: null
   });
  
   const errRef = useRef();
   const navigate = useNavigate()

   useEffect(() => {
       setErrMsg('');
   }, [user, pwd]);

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

       axios.post("http://localhost:5000/upload/profile", data, {
           headers: { "Content-Type": "multipart/form-data" }
       }).then(res => {
           console.log(res);
           if (res.data.success === 1) {
               console.log("image uploaded");
           }
       })
   }

   const handleBack = () => {
       navigate(-1)
   }

   const handleSubmit = async (e) => {
       e.preventDefault();

       console.log("-----------------------------------")
       console.log("user: " + user);
       console.log("pwd: " + pwd);
       console.log("pwd2: " + pwd2);
       console.log("role: " + role);
       console.log("image: " + image.file.name);
       console.log("name: " + name);
       console.log("description: " + description);
       console.log("website: " + website);
       console.log("location: " + location);

       try {
           const accountData = JSON.stringify({
               "username": user,
               "password": pwd,
               "role": role
           });

           const profileData = JSON.stringify({
               "username": user,
               "name": name,
               "description": description,
               "website": website,
               "location": location,
               "image": image.file.name,
               "role" : role
             });

           const res = await axios.post('http://localhost:5000/addaccount', accountData,
               {
                   headers: {'Content-Type': 'application/json'},
               });
          
           console.log(JSON.stringify(res.data));

           const res2 = await axios.post('http://localhost:5000/addprofile', profileData,
               {
                   headers: {'Content-Type': 'application/json'},
               });
          
           console.log(JSON.stringify(res2.data));

           uploadImage(image);
          
           setUser('');
           setPwd('');
           setPwd2('');
           setRole(options[0]);
           setName('');
           setDescription('');
           setWebsite('');
           setLocation('');
           setImage({
               file: [],
               filepreview: null
           });

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
                try {
                  if (typeof requestAnimationFrame !== 'undefined') {
                    requestAnimationFrame(() => { try { errRef.current && errRef.current.focus(); } catch (e) {} });
                  } else {
                    setTimeout(() => { try { errRef.current && errRef.current.focus(); } catch (e) {} }, 0);
                  }
                } catch (e) {}
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

         <Container sx={{ position: "relative", zIndex: 1, py: 4, minHeight: "100vh", display: "flex", alignItem: "center", justifyContent: "content" }}>
           <GlassBox>
             {/* Header Section */}
             <Box sx={{ textAlign: "center", mb: 4 }}>
               <Box
                 sx={{
                   width: "70px",
                   height: "70px",
                   borderRadius: "50%",
                   background: "#0F1B4C",
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "center",
                   margin: "0 auto 16px",
                   boxShadow: "0 8px 25px rgba(15, 27, 76, 0.4)",
                 }}
               >
                 <PersonAddIcon sx={{ fontSize: 35, color: "#ffffff" }} />
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
                 Add Account
               </Typography>
               <Typography
                 variant="h6"
                 sx={{
                   color: "#666",
                   fontWeight: 500,
                   fontSize: "1rem",
                 }}
               >
                 Create a new user account
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

             {/* Form */}
             <form onSubmit={handleSubmit}>
               <ModernTextField
                 fullWidth
                 id="username"
                 margin="normal"
                 label="Username"
                 variant="outlined"
                 onChange={(e) => setUser(e.target.value)}
                 value={user}
               />

               <ModernTextField
                 fullWidth
                 id="password"
                 margin="normal"
                 label="Password"
                 type='password'
                 variant="outlined"
                 onChange={(e) => setPwd(e.target.value)}
                 value={pwd}
               />

               <ModernTextField
                 fullWidth
                 id="confirm-password"
                 margin="normal"
                 label="Confirm Password"
                 type='password'
                 variant="outlined"
                 onChange={(e) => setPwd2(e.target.value)}
                 value={pwd2}
               />

               {pwd !== pwd2 && pwd2.length > 0 && (
                 <Typography
                   variant="body2"
                   sx={{
                     textAlign: "center",
                     fontSize: "14px",
                     color: "#f44336",
                     mt: 1,
                     mb: 2,
                   }}
                 >
                   Passwords do not match
                 </Typography>
               )}

               <Autocomplete
                 disablePortal
                 id="role-select"
                 options={options}
                 fullWidth
                 value={role}
                 onChange={(event, newRole) => {
                   setRole(newRole);
                 }}
                 sx={{ mt: 2, mb: 1 }}
                 renderInput={(params) =>
                   <ModernTextField {...params}
                     fullWidth
                     margin="normal"
                     label="Role"
                     variant="outlined"
                   />}
               />

               {/* Upload Image Button */}
               <Button
                 variant="outlined"
                 component="label"
                 fullWidth
                 startIcon={<CloudUploadIcon />}
                 sx={{
                   marginTop: "20px",
                   marginBottom: "10px",
                   borderRadius: '12px',
                   borderColor: 'rgba(15, 27, 76, 0.3)',
                   color: '#0F1B4C',
                   borderWidth: '2px',
                   padding: '12px',
                   fontWeight: 600,
                   '&:hover': {
                     borderColor: '#0F1B4C',
                     backgroundColor: 'rgba(15, 27, 76, 0.05)',
                   },
                 }}
               >
                 Upload Profile Image
                 <input
                   type="file"
                   hidden
                   onChange={handleImage}
                 />
               </Button>

               {image.filepreview !== null && (
                 <Box sx={{ textAlign: "center", my: 2 }}>
                   <ImageIcon sx={{ color: '#0F1B4C', fontSize: 40, mb: 1 }} />
                   <img 
                     src={image.filepreview} 
                     alt="preview" 
                     style={{ 
                       width: "150px", 
                       height: "150px", 
                       borderRadius: "12px",
                       objectFit: "cover",
                       border: "2px solid rgba(15, 27, 76, 0.2)",
                     }} 
                   />
                 </Box>
               )}

               <ModernTextField
                 fullWidth
                 id="name"
                 margin="normal"
                 label="Full Name"
                 variant="outlined"
                 onChange={(e) => setName(e.target.value)}
                 value={name}
               />

               <ModernTextField
                 fullWidth
                 id="description"
                 margin="normal"
                 label="Description"
                 variant="outlined"
                 multiline
                 minRows={2}
                 onChange={(e) => setDescription(e.target.value)}
                 value={description}
               />

               <ModernTextField
                 fullWidth
                 id="website"
                 margin="normal"
                 label="Website"
                 variant="outlined"
                 onChange={(e) => setWebsite(e.target.value)}
                 value={website}
               />

               <ModernTextField
                 fullWidth
                 id="location"
                 margin="normal"
                 label="Location"
                 variant="outlined"
                 onChange={(e) => setLocation(e.target.value)}
                 value={location}
               />

               <GradientButton
                 type="submit"
                 fullWidth
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
               >
                 Create Account
               </GradientButton>

               <Box sx={{ textAlign: "center", mt: 2 }}>
                 <BackButton
                   onClick={handleBack}
                   startIcon={<ArrowBackIcon />}
                 >
                   Back to Admin
                 </BackButton>
               </Box>
             </form>
           </GlassBox>
         </Container>
       </Box>
   );
}

export default AddAccount;


