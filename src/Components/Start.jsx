import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Snackbar,
  Alert,
  Fade,
} from "@mui/material";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  useEffect(() => {
    if (location.state?.loggedOut) {
      setShowLogoutMessage(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <div
      style={{
        backgroundImage: "url('/src/assets/rectangle2.png')",
        backgroundColor: "#ECECEE",
        backgroundSize: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right top",
        width: "100%",
        minHeight: "100vh",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* AppBar */}
      <AppBar position="static" sx={{ backgroundColor: "#8CAE34" }}>
        <Toolbar>
          <Typography
            variant="logo"
            sx={{
              fontWeight: 800,
              color: "#FFFFFF",
              fontSize: { xs: "20px", sm: "22px", md: "24px" },
            }}
          >
            York.IE Calories
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          py: { xs: 4, md: 8 },
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Typography
              fontWeight="bold"
              fontStyle="italic"
              gutterBottom
              sx={{
                fontSize: {
                  xs: "28px",
                  sm: "36px",
                  md: "44px",
                  lg: "52px",
                },
                lineHeight: {
                  xs: "36px",
                  sm: "44px",
                  md: "52px",
                  lg: "60px",
                },
                color: "#2e3d49",
              }}
            >
              Welcome to YORK.IE Calories 🍟
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "16px", sm: "18px", md: "20px" },
                color: "#4a5a6a",
                mb: { xs: 2, sm: 3 },
                fontWeight : "bold"
              }}
              gutterBottom
            >
              Snap. Upload. Track your meals 👍
            </Typography>

            <Button
              onClick={handleGetStarted}
              variant="contained"
              sx={{
                mt: 4,
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                px: 5,
                py: 1.5,
                backgroundColor: "#8CAE34",
                fontWeight: "bold",
                borderRadius: "12px",
                ":hover": {
                  backgroundColor: "#789C2F",
                },
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Logout Snackbar */}
      <Snackbar
        open={showLogoutMessage}
        autoHideDuration={5000}
        onClose={() => setShowLogoutMessage(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Fade}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setShowLogoutMessage(false)}
        >
          You have successfully logged out.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
