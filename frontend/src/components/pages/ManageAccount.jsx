import { Box, Paper, Typography, Container, Button, Chip } from '@mui/material';
import { styled } from "@mui/material/styles";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh'; // Add this import

// Apply your glass morphism styling
const GlassBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
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

// Custom DataGrid styling
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 'none',
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#0F1B4C',
    color: '#ffffff',
    borderRadius: '12px 12px 0 0',
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 600,
    },
  },
  '& .MuiDataGrid-cell': {
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
  },
  '& .MuiDataGrid-row': {
    '&:hover': {
      backgroundColor: 'rgba(15, 27, 76, 0.04)',
    },
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
  },
}));

// Define columns with visual improvements
const columns = [
  { 
    field: 'name', 
    headerName: 'Name', 
    width: 140, 
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 280,
    editable: true,
  },
  { 
    field: 'username', 
    headerName: 'Username', 
    width: 140, 
    editable: true,
  },
  { 
    field: 'website', 
    headerName: 'Website', 
    width: 180, 
    editable: true,
  },
  { 
    field: 'location', 
    headerName: 'Location', 
    width: 150, 
    editable: true,
  },
  { 
    field: 'role', 
    headerName: 'Role', 
    width: 130, 
    editable: true,
    renderCell: (params) => {
      const getRoleColor = (role) => {
        switch(role) {
          case 'manufacturer': return '#4caf50';
          case 'supplier': return '#2196f3';
          case 'retailer': return '#ff9800';
          default: return '#9e9e9e';
        }
      };
      
      return (
        <Chip 
          label={params.value}
          size="small"
          sx={{
            backgroundColor: `${getRoleColor(params.value)}20`,
            color: getRoleColor(params.value),
            fontWeight: '600',
            textTransform: 'capitalize'
          }}
        />
      );
    }
  },
  { 
    field: 'image', 
    headerName: 'Image', 
    width: 120,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 180,
    renderCell: () => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button 
          size="small" 
          variant="outlined"
          startIcon={<EditIcon />} 
          sx={{ 
            borderColor: '#0F1B4C',
            color: '#0F1B4C',
            '&:hover': {
              backgroundColor: 'rgba(15, 27, 76, 0.1)',
              borderColor: '#0F1B4C'
            }
          }}
        >
          Edit
        </Button>
        <Button 
          size="small" 
          variant="outlined"
          startIcon={<DeleteIcon />} 
          sx={{ 
            borderColor: '#f44336',
            color: '#f44336',
            '&:hover': {
              backgroundColor: 'rgba(244, 67, 54, 0.1)',
              borderColor: '#f44336'
            }
          }}
        >
          Delete
        </Button>
      </Box>
    ),
  }
];

const ManageAccount = () => {
   const [rows, setRows] = useState([]);
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
       handleData();
   }, []);

   const handleData = async (e) => {
     setLoading(true);
     try {
       const res = await axios.get('http://localhost:5000/profileAll');
       console.log(JSON.stringify(res.data));
       setRows(res.data);
     } catch (error) {
       console.error('Error fetching data:', error);
     } finally {
       setLoading(false);
     }
   }

   const handleBack = () => {
       navigate(-1)
   }

   return (
       <Box
         sx={{
           minHeight: "100vh",
           background: "#c7e9dbff",
           padding: 2,
           position: "relative",
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

         <Container sx={{ 
           position: "relative", 
           zIndex: 1,
           py: 4,
         }}>
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
                 <ManageAccountsIcon sx={{ fontSize: 35, color: "#ffffff" }} />
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
                 Manage Accounts
               </Typography>
               <Typography
                 variant="h6"
                 sx={{
                   color: "#666",
                   fontWeight: 500,
                   fontSize: "1rem",
                   mb: 3,
                 }}
               >
                 View and manage all user accounts
               </Typography>
             </Box>

             {/* Refresh Button */}
             <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
               <Button 
                 startIcon={<RefreshIcon />}
                 onClick={handleData}
                 sx={{ 
                   color: '#0F1B4C',
                   '&:hover': { backgroundColor: 'rgba(15, 27, 76, 0.1)' }
                 }}
               >
                 Refresh Data
               </Button>
             </Box>

             {/* DataGrid Section */}
             <Paper 
               sx={{ 
                 height: 400, 
                 width: '100%', 
                 backgroundColor: "rgba(255, 255, 255, 0.8)",
                 borderRadius: '12px',
                 overflow: 'hidden',
                 border: '1px solid rgba(0, 0, 0, 0.08)',
               }}
             >
               <StyledDataGrid
                 rows={rows}
                 columns={columns}
                 pageSize={5}
                 rowsPerPageOptions={[5]}
                 disableSelectionOnClick
                 loading={loading}
                 sx={{
                   '& .MuiDataGrid-cell:focus': {
                     outline: 'none',
                   },
                   '& .MuiDataGrid-cell:focus-within': {
                     outline: 'none',
                   },
                 }}
               />
             </Paper>

             {/* Empty State */}
             {rows.length === 0 && !loading && (
               <Box sx={{ 
                 height: 200, 
                 display: 'flex', 
                 flexDirection: 'column', 
                 alignItems: 'center', 
                 justifyContent: 'center',
                 backgroundColor: 'rgba(255, 255, 255, 0.5)',
                 borderRadius: '12px',
                 border: '2px dashed rgba(15, 27, 76, 0.2)',
                 mt: 2
               }}>
                 <ManageAccountsIcon sx={{ fontSize: 60, color: 'rgba(15, 27, 76, 0.3)', mb: 2 }} />
                 <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
                   No accounts found
                 </Typography>
                 <Typography variant="body2" sx={{ color: '#999' }}>
                   Start by adding your first account
                 </Typography>
               </Box>
             )}

             {/* Stats Summary */}
             <Box sx={{ 
               display: 'flex', 
               justifyContent: 'space-between', 
               mt: 3, 
               mb: 3,
               backgroundColor: 'rgba(15, 27, 76, 0.05)',
               borderRadius: '12px',
               p: 2,
             }}>
               <Box sx={{ textAlign: 'center' }}>
                 <Typography variant="h6" sx={{ color: '#0F1B4C', fontWeight: 600 }}>
                   {rows.length}
                 </Typography>
                 <Typography variant="body2" sx={{ color: '#666' }}>
                   Total Accounts
                 </Typography>
               </Box>
               <Box sx={{ textAlign: 'center' }}>
                 <Typography variant="h6" sx={{ color: '#0F1B4C', fontWeight: 600 }}>
                   {rows.filter(row => row.role === 'manufacturer').length}
                 </Typography>
                 <Typography variant="body2" sx={{ color: '#666' }}>
                   Manufacturers
                 </Typography>
               </Box>
               <Box sx={{ textAlign: 'center' }}>
                 <Typography variant="h6" sx={{ color: '#0F1B4C', fontWeight: 600 }}>
                   {rows.filter(row => row.role === 'supplier').length}
                 </Typography>
                 <Typography variant="body2" sx={{ color: '#666' }}>
                   Suppliers
                 </Typography>
               </Box>
               <Box sx={{ textAlign: 'center' }}>
                 <Typography variant="h6" sx={{ color: '#0F1B4C', fontWeight: 600 }}>
                   {rows.filter(row => row.role === 'retailer').length}
                 </Typography>
                 <Typography variant="body2" sx={{ color: '#666' }}>
                   Retailers
                 </Typography>
               </Box>
             </Box>

             {/* Back Button */}
             <Box sx={{ textAlign: "center", mt: 2 }}>
               <BackButton
                 onClick={handleBack}
                 startIcon={<ArrowBackIcon />}
               >
                 Back to Admin
               </BackButton>
             </Box>
           </GlassBox>
         </Container>
       </Box>
   );
}

export default ManageAccount;


