import React, { useState, useEffect } from "react";
import { 
  AppBar, Toolbar, Typography, Avatar, Button, TextField, 
  Card, CardContent, Drawer, IconButton, Snackbar, Alert, Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, logout } from "../redux/userSlice"; 
import LogoutIcon from "@mui/icons-material/Logout";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  avatarUrl: yup.string().url("Enter a valid URL").required("Avatar URL is required"),
});

const History = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const [updatedUser, setUpdatedUser] = useState(user || { name: "", email: "", avatarUrl: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user, navigate]);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{
      backgroundImage: "url('/src/assets/rectangle2.png')",
      backgroundColor: "#ECECEE",
      backgroundSize: "100vh",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right",
      width: "100%",
      height: "100vh",
      paddingTop: "64px", 
    }}>
      
      <AppBar position="fixed" sx={{ backgroundColor: "#8CAE34", top: 0, left: 0, width: "100%" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="logo" sx={{ fontWeight: "800" }}>York.IE Calories</Typography>

          <div style={{ display: "flex", gap: "24px", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            <Button color="inherit" sx={{ fontWeight: "bold", textTransform: "none" }} onClick={() => navigate("/upload")}>Home</Button>
            <Button color="inherit" sx={{ fontWeight: "bold", textTransform: "none" }} onClick={() => navigate("/history")}>History</Button>
            <Button color="inherit" sx={{ fontWeight: "bold", textTransform: "none" }} onClick={() => navigate("/profile")}>Profile</Button>
          </div>
        </Toolbar>
      </AppBar>

      <Typography 
        variant="h4" 
        sx={{ 
          marginTop: "10px", 
          fontWeight: "bold", 
          color: "#555", 
          textAlign: "center" 
        }}
      >
        No scanned Food Now...!
      </Typography>
    </div>
  );
};

export default History;