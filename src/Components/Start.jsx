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
      <AppBar position="static" sx={{ backgroundColor: "#8CAE34" }}>
        <Toolbar>
          <Box
            className="rounded-full bg-white text-[#8CAE34] font-bold mr-2"
            sx={{
              width: { xs: 36, sm: 42, md: 48 },
              height: { xs: 36, sm: 42, md: 48 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.25rem" },
            }}
          >
            YC
          </Box>
        </Toolbar>
      </AppBar>

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
            {/* YC Logo Above Heading */}
            <Box
              className="rounded-full bg-[#8CAE34] text-white font-bold mx-auto mb-4"
              sx={{
                width: { xs: 56, sm: 64 },
                height: { xs: 56, sm: 64 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
              }}
            >
              YC
            </Box>

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
                color: "transparent",
                WebkitTextStroke: "1.2px white",
                WebkitTextFillColor: "#8CAE34",
                textShadow: "1px 1px 2px rgba(0,0,0,0.15)",
              }}
            >
              Welcome to YORK.IE Calories 🍟
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "16px", sm: "18px", md: "20px" },
                color: "#4a5a6a",
                mb: { xs: 2, sm: 3 },
                fontWeight: "bold",
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
