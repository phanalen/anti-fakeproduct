import { Box, styled, Typography, Paper, Divider } from "@mui/material";
import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CustomButton from "./CustomButton";

const Guide = () => {
  // Unused styled components removed

  const DetailsPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    maxWidth: "800px",
    width: "100%",
    backgroundColor: "#f8f9fa",
    borderLeft: "4px solid #17275F",
  }));

  const PhaseSection = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5rem",
      }}
    >
      <div
        style={{
          width: "5%",
          height: "5px",
          backgroundColor: "#000339",
          margin: "0 auto",
        }}
      ></div>

      <Typography
        variant="h3"
        sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", my: 3 }}
      >
        How it works?
      </Typography>

      {/* Anti-Counterfeit System Details */}
      <DetailsPaper elevation={0}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          align="center"
          sx={{ color: "#000339", fontWeight: "bold", mb: 3 }}
        >
        Overview
        </Typography>
        
        <Typography
          variant="body1"
          paragraph
          sx={{ fontSize: "16px", lineHeight: 1.6, color: "#5A6473" }}
        >
          This anti-counterfeit system utilizes blockchain and digital signatures to guarantee product authenticity and traceability from manufacturer to consumer.
        </Typography>

        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 4, color: "#17275F", fontWeight: "600" }}
        >
          The process has three phases:
        </Typography>

        {/* Phase 1 */}
        <PhaseSection>
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{ color: "#000339", fontWeight: "bold", display: "flex", alignItems: "center" }}
          >
            <Box
              sx={{
                backgroundColor: "#17275F",
                color: "white",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              1
            </Box>
            Product Creation (Manufacturer)
          </Typography>
          <Typography
            variant="body2"
            sx={{ pl: 7, color: "#5A6473", lineHeight: 1.6 }}
          >
            Each product is registered on the blockchain as a unique Token ID (digital deed). 
            The manufacturer applies their secret digital signature to this ID and embeds both 
            into a QR code. This signature is the tamper-proof certificate of origin.
          </Typography>
        </PhaseSection>

        {/* Phase 2 */}
        <PhaseSection>
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{ color: "#000339", fontWeight: "bold", display: "flex", alignItems: "center" }}
          >
            <Box
              sx={{
                backgroundColor: "#17275F",
                color: "white",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              2
            </Box>
            Supply Chain (Supplier & Retailer)
          </Typography>
          <Typography
            variant="body2"
            sx={{ pl: 7, color: "#5A6473", lineHeight: 1.6 }}
          >
            As the product moves, the Supplier and Retailer update its status by using their 
            accounts to sign blockchain transactions. This transfer is permanently recorded on 
            the immutable ledger, verifying that the product was handled by authorized and 
            known parties.
          </Typography>
        </PhaseSection>

        {/* Phase 3 */}
        <PhaseSection>
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{ color: "#000339", fontWeight: "bold", display: "flex", alignItems: "center" }}
          >
            <Box
              sx={{
                backgroundColor: "#17275F",
                color: "white",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              3
            </Box>
            Consumer Verification
          </Typography>
          <Typography
            variant="body2"
            sx={{ pl: 7, color: "#5A6473", lineHeight: 1.6, mb: 2 }}
          >
            The consumer scans the QR code, initiating a two-part check:
          </Typography>
          <Box sx={{ pl: 9 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
              <ArrowRightAltIcon sx={{ color: "#1976d2", mr: 1, mt: 0.5 }} />
              <Typography
                variant="body2"
                sx={{ color: "#5A6473", lineHeight: 1.6 }}
              >
                The app verifies the Manufacturer's digital signature to confirm the product's 
                origin (QR code is genuine).
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <ArrowRightAltIcon sx={{ color: "#1976d2", mr: 1, mt: 0.5 }} />
              <Typography
                variant="body2"
                sx={{ color: "#5A6473", lineHeight: 1.6 }}
              >
                The app queries the blockchain for the Token ID's history, confirming the 
                unbroken chain of custody and the verified identities of the Supplier and 
                Retailer who moved it.
              </Typography>
            </Box>
          </Box>
        </PhaseSection>

        <Divider sx={{ my: 4 }} />

        {/* Conclusion */}
        <Box
          sx={{
            mt: 3,
            p: 3,
            backgroundColor: "#eceffcff",
            borderRadius: 2,
            borderLeft: "4px solid #4caf50",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: "600",
              fontStyle: "italic",
              color: "#2e7d32",
              lineHeight: 1.6,
            }}
          >
            This combined approach ensures that the product is both authentic and has a 
            verified history, stopping counterfeit goods that lack the valid signature 
            or the correct transaction record.
          </Typography>
        </Box>
      </DetailsPaper>

      
      <CustomButton
        backgroundColor="#0F1B4C"
        color="#fff"
        buttonText="See Full Guides"
        guideBtn={true}
      />
    </Box>
  );
};

export default Guide;
