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

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [updatedUser, setUpdatedUser] = useState(user || { name: "", email: "", avatarUrl: "" });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user, navigate]);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleSave = async () => {
    try {
      await validationSchema.validate(updatedUser, { abortEarly: false });
      setErrors({});
      dispatch(updateUser(updatedUser));
      setSuccessMessage(true);
    } catch (err) {
      if (err.inner) {
        const validationErrors = {};
        err.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  const handleCloseSuccess = () => {
    setSuccessMessage(false);
  };

  const handleLogout = () => {
    dispatch(logout());  
    navigate("/register");  
  };

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

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Card sx={{ width: 250, p: 2, backgroundColor: "white", height: "100%" }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>User Profile</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar src={user?.avatarUrl} sx={{ bgcolor: user?.avatarUrl ? "transparent" : "black", width: 56, height: 56, mb: 1 }}>
                {!user?.avatarUrl && (user?.name ? user.name.charAt(0).toUpperCase() : 'U')}
              </Avatar>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{user?.name}</Typography>
              <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
            </Box>
            <Button 
              fullWidth 
              variant="outlined" 
              color="error" 
              startIcon={<LogoutIcon />} 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </Drawer>
    </div>
  );
};

export default Profile;