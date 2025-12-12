import { Button, styled, Typography, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState, useRef } from "react"; // Added useRef
// CustomButton import removed (unused)


const GetStarted = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessEmail: "",
    company: "",
    comments: ""
  });


  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Use refs to track form values without triggering re-renders
  const formRef = useRef({
    firstName: "",
    lastName: "",
    businessEmail: "",
    company: "",
    comments: ""
  });


  const CustomContainer = styled(Container)(({ theme }) => ({
    backgroundColor: "#e0f1eaff",
    /*backgroundColor: "#17275F",*/
    height: "auto",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(4),
    gap: theme.spacing(4),
    [theme.breakpoints.down("md")]: {
      height: "auto",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(3),
      width: "90%",
    },
  }));


  const CustomBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(10, 0, 10, 0),
    margin: theme.spacing(0, 2, 0, 2),
    [theme.breakpoints.down("md")]: {
      padding: "0",
    },
  }));


  const FormBox = styled(Box)(({ theme }) => ({
    backgroundColor: "white",
    borderRadius: "10px",
    padding: theme.spacing(4),
    width: "50%",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginBottom: theme.spacing(3),
    },
  }));


  const ContentBox = styled(Box)(({ theme }) => ({
    width: "45%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      textAlign: "center",
    },
  }));


  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update ref immediately for smooth typing
    formRef.current[name] = value;
    // Debounced state update
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }, 0);
  };


  const handleBlur = (e) => {
    const { name } = e.target;
    // Sync ref with formData on blur
    setFormData(prev => ({
      ...prev,
      [name]: formRef.current[name]
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };


  // validateForm removed (unused)


  const handleSubmit = async (e) => {
    e.preventDefault();
   
    // Use ref values for validation (more up-to-date)
    const currentFormData = { ...formRef.current };
    
    const newErrors = {};
    if (!currentFormData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!currentFormData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!currentFormData.businessEmail.trim()) {
      newErrors.businessEmail = "Business email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentFormData.businessEmail)) {
      newErrors.businessEmail = "Please enter a valid email address";
    }
    if (!currentFormData.company.trim()) newErrors.company = "Company name is required";
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
   
    setIsSubmitting(true);
   
    try {
      console.log("Form submitted:", currentFormData);
      setFormData(currentFormData); // Sync with state
     
      await new Promise(resolve => setTimeout(resolve, 3000));
     
      setIsSubmitted(true);
     
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          businessEmail: "",
          company: "",
          comments: ""
        });
        // Reset refs too
        Object.keys(formRef.current).forEach(key => {
          formRef.current[key] = "";
        });
        setIsSubmitted(false);
      }, 3000);
     
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


  const renderForm = () => (
    <FormBox component="form" onSubmit={handleSubmit}>
      <Typography
        variant="h5"
        sx={{
          color: "#17275F",
          fontWeight: "700",
          mb: 3,
          textAlign: "center"
        }}
      >
        Request a Consultation
      </Typography>
     
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          defaultValue={formData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.firstName}
          helperText={errors.firstName}
          required
          size="small"
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          defaultValue={formData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.lastName}
          helperText={errors.lastName}
          required
          size="small"
        />
      </Box>
     
      <TextField
        fullWidth
        label="Business Email"
        name="businessEmail"
        type="email"
        defaultValue={formData.businessEmail}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!errors.businessEmail}
        helperText={errors.businessEmail}
        required
        size="small"
        sx={{ mb: 3 }}
      />
     
      <TextField
        fullWidth
        label="Company"
        name="company"
        defaultValue={formData.company}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!errors.company}
        helperText={errors.company}
        required
        size="small"
        sx={{ mb: 3 }}
      />
     
      <TextField
        fullWidth
        label="Comments/Questions"
        name="comments"
        defaultValue={formData.comments}
        onChange={handleChange}
        onBlur={handleBlur}
        multiline
        rows={4}
        placeholder="Tell us about your needs and any specific requirements..."
        size="small"
        sx={{ mb: 3 }}
      />
     
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#316b6e",
          color: "white",
          py: 1.5,
          fontWeight: "600",
          '&:hover': {
            backgroundColor: "#316b6e",
          }
        }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Consultation Request"}
      </Button>
    </FormBox>
  );


  const renderSuccessMessage = () => (
    <FormBox>
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography
          variant="h5"
          sx={{
            color: "#2e7d32",
            fontWeight: "700",
            mb: 2
          }}
        >
          Thank You!
        </Typography>
        <Typography sx={{ color: "#555", mb: 3 }}>
          Your consultation request has been submitted successfully.
          Our team will contact you at <strong>{formData.businessEmail}</strong> within 24 hours.
        </Typography>
        <Typography sx={{ color: "#777", fontSize: "0.9rem" }}>
          We're excited to help you secure your supply chain with blockchain technology!
        </Typography>
      </Box>
    </FormBox>
  );


  return (
    <CustomBox>
      <CustomContainer>
        <ContentBox>
          <Typography
            sx={{ fontSize: "35px", color: "#000339", fontWeight: "700", mb: 2 }}
          >
            Get Started with Blockchain Traceability
          </Typography>
          <Typography
            sx={{ fontSize: "16px", color: "##5A6473", fontWeight: "500", mb: 3 }}
          >
            Ready to protect your products with our anti-counterfeit system?
            Request a free consultation with our experts to learn how blockchain
            technology can secure your supply chain.
          </Typography>
         
          <Box sx={{ mt: 4 }}>
            <Typography
              sx={{ fontSize: "18px", color: "#000339", fontWeight: "600", mb: 2 }}
            >
              What you'll get:
            </Typography>
            <Box component="ul" sx={{ color: "##5A6473", pl: 2 }}>
              <Typography component="li" sx={{ mb: 1 }}>
                30-minute personalized consultation
              </Typography>
              <Typography component="li" sx={{ mb: 1 }}>
                Custom solution proposal for your business
              </Typography>
              <Typography component="li" sx={{ mb: 1 }}>
                Implementation timeline and pricing
              </Typography>
              <Typography component="li">
                Free pilot program assessment
              </Typography>
            </Box>
          </Box>
        </ContentBox>


        {isSubmitted ? renderSuccessMessage() : renderForm()}
      </CustomContainer>
    </CustomBox>
  );
};


export default GetStarted;
