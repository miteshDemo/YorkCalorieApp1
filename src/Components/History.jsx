import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const History = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: "url('/src/assets/rectangle2.png')",
        backgroundColor: "#ECECEE",
        backgroundSize: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        width: "100%",
        paddingTop: "64px",
      }}
    >
      
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#8CAE34",
          top: 0,
          left: 0,
          width: "100%",
        }}
      >
        <Toolbar className="flex flex-col md:flex-row justify-between items-center w-full px-4 gap-2">
         
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

         
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              color="inherit"
              sx={{ fontWeight: "bold", textTransform: "none" }}
              onClick={() => navigate("/upload")}
            >
              Home
            </Button>
            <Button
              color="inherit"
              sx={{ fontWeight: "bold", textTransform: "none" }}
              onClick={() => navigate("/history")}
            >
              History
            </Button>
            <Button
              color="inherit"
              sx={{ fontWeight: "bold", textTransform: "none" }}
              onClick={() => navigate("/profile")}
            >
              Profile
            </Button>
          </div>
        </Toolbar>
      </AppBar>

    
      <Typography
        variant="h4"
        sx={{ fontWeight : "bold"}}
      >
        No scanned Food Now...!
      </Typography>
    </div>
  );
};

export default History;
