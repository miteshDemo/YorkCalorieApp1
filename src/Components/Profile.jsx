import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Button,
  TextField,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Box,
  Popover
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, logout } from "../redux/userSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  avatarUrl: yup.string().url("Enter a valid URL").notRequired(),
});

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [updatedUser, setUpdatedUser] = useState(user || { name: "", email: "", avatarUrl: "" });
  const [successMessage, setSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({});
  const [anchorEl, setAnchorEl] = useState(null); // for popover

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

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/src/assets/rectangle2.png')",
        backgroundColor: "#ECECEE",
        backgroundSize: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        width: "100%",
        height: "100vh",
        paddingTop: "64px",
      }}
    >
      <AppBar position="fixed" sx={{ backgroundColor: "#8CAE34", top: 0, left: 0, width: "100%" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="logo" sx={{ fontWeight: "800" }}>York.IE Calories</Typography>

          <div style={{ display: "flex", gap: "24px", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            <Button color="inherit" sx={{ fontWeight: "bold", textTransform: "none" }} onClick={() => navigate("/upload")}>Home</Button>
            <Button color="inherit" sx={{ fontWeight: "bold", textTransform: "none" }} onClick={() => navigate("/history")}>History</Button>
            <Button color="inherit" sx={{ fontWeight: "bold", textTransform: "none" }} onClick={() => navigate("/profile")}>Profile</Button>
          </div>

          <Button onClick={handleAvatarClick} sx={{ p: 0, minWidth: 0 }}>
            <Avatar src={user?.avatarUrl || undefined} sx={{ bgcolor: user?.avatarUrl ? "transparent" : "black" }}>
              {!user?.avatarUrl && (user?.name ? user.name.charAt(0).toUpperCase() : "U")}
            </Avatar>
          </Button>
        </Toolbar>
      </AppBar>

      <Snackbar open={successMessage} autoHideDuration={3000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '200%' }}>
          Profile updated successfully!
        </Alert>
      </Snackbar>

      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          boxShadow: 3,
          borderRadius: 3,
          p: 3,
          backgroundColor: "white",
          mt: 5,
        }}
      >
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, fontStyle: "italic" }}>
            {user?.name}'s Profile
          </Typography>
          <div className="space-y-4">
            <TextField
              fullWidth
              label="Name"
              value={updatedUser.name}
              onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
              error={!!errors.name}
              helperText={errors.name}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={updatedUser.email}
              onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Avatar URL"
              value={updatedUser.avatarUrl || ""}
              onChange={(e) => setUpdatedUser({ ...updatedUser, avatarUrl: e.target.value })}
              error={!!errors.avatarUrl}
              helperText={errors.avatarUrl}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" fullWidth sx={{ backgroundColor: "black" }} onClick={handleSave}>
              Update
            </Button>
          </div>
        </CardContent>
      </Card>

      
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ mt: 1 }}
      >
        <Card sx={{ p: 2, width: 250 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              src={user?.avatarUrl || undefined}
              sx={{ bgcolor: user?.avatarUrl ? "transparent" : "black", width: 56, height: 56, mb: 1 }}
            >
              {!user?.avatarUrl && (user?.name ? user.name.charAt(0).toUpperCase() : "U")}
            </Avatar>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Welcome, {user?.name}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{user?.email}</Typography>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Card>
      </Popover>
    </div>
  );
};

export default Profile;
