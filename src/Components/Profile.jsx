import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Avatar, Button, TextField, Card, CardContent, Snackbar, Alert, Box, Popover, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, logout } from "../redux/userSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required")
    .test("is-lowercase", "Email must be in lowercase", (value) => value === value?.toLowerCase()),
  avatarUrl: yup.string().url("Enter a valid URL").notRequired(),
});

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [updatedUser, setUpdatedUser] = useState(user || { name: "", email: "", avatarUrl: "" });
  const [successMessage, setSuccessMessage] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState(false);
  const [alreadyUpdatedMessage, setAlreadyUpdatedMessage] = useState(false);
  const [errors, setErrors] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmLogout, setConfirmLogout] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user, navigate]);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleSave = async () => {
    if (
      updatedUser.name === user.name &&
      updatedUser.email === user.email &&
      (updatedUser.avatarUrl || "") === (user.avatarUrl || "")
    ) {
      setAlreadyUpdatedMessage(true);
      return;
    }

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

  const handleLogout = () => {
    setConfirmLogout(true);
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    setLogoutMessage(true);
    setConfirmLogout(false);
    navigate("/register");
  };

  const handleCancelLogout = () => {
    setConfirmLogout(false);
  };

  const handleCloseSuccess = () => setSuccessMessage(false);
  const handleCloseLogout = () => setLogoutMessage(false);
  const handleCloseAlreadyUpdated = () => setAlreadyUpdatedMessage(false);

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

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
      <AppBar position="fixed" sx={{ backgroundColor: "#8CAE34", top: 0, left: 0, width: "100%" }}>
        <Toolbar className="flex justify-between items-center px-4">
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

          <div className="flex items-center gap-4">
            <Button sx={{ color: "#fff", fontWeight: "bold", textTransform: "none" }} onClick={() => navigate("/upload")}>
              Home
            </Button>
            <Button sx={{ color: "#fff", fontWeight: "bold", textTransform: "none" }} onClick={() => navigate("/history")}>
              History
            </Button>
            <Button sx={{ color: "#fff", fontWeight: "bold", textTransform: "none" }} onClick={() => navigate("/profile")}>
              Profile
            </Button>
            <Button onClick={handleAvatarClick} sx={{ p: 0, minWidth: 0 }}>
              <Avatar
                src={user?.avatarUrl || undefined}
                sx={{ bgcolor: user?.avatarUrl ? "transparent" : "black", width: 32, height: 32 }}
              >
                {!user?.avatarUrl && (user?.name ? user.name.charAt(0).toUpperCase() : "U")}
              </Avatar>
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Snackbar open={successMessage} autoHideDuration={3000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: "100%" }}>
          Profile updated successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={logoutMessage} autoHideDuration={3000} onClose={handleCloseLogout}>
        <Alert onClose={handleCloseLogout} severity="info" sx={{ width: "100%" }}>
          You have been logged out.
        </Alert>
      </Snackbar>

      <Snackbar open={alreadyUpdatedMessage} autoHideDuration={3000} onClose={handleCloseAlreadyUpdated}>
        <Alert onClose={handleCloseAlreadyUpdated} severity="info" sx={{ width: "100%" }}>
          Already Updated
        </Alert>
      </Snackbar>

      <div className="flex justify-center w-full mt-10">
        <Card
          sx={{
            width: "100%",
            maxWidth: 500,
            boxShadow: 3,
            borderRadius: 3,
            p: 3,
            backgroundColor: "white",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontStyle: "italic",
                fontSize: { xs: "24px", sm: "30px", md: "36px" },
              }}
            >
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
              />
              <TextField
                fullWidth
                label="Email"
                value={updatedUser.email}
                onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value.toLowerCase() })}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                fullWidth
                label="Avatar URL"
                value={updatedUser.avatarUrl || ""}
                onChange={(e) => setUpdatedUser({ ...updatedUser, avatarUrl: e.target.value })}
                error={!!errors.avatarUrl}
                helperText={errors.avatarUrl}
              />
              <Button variant="contained" fullWidth sx={{ backgroundColor: "black", mt: 2 }} onClick={handleSave}>
                Update
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{ mt: 1 }}
      >
        <Card sx={{ p: 2, width: 250 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar
              src={user?.avatarUrl || undefined}
              sx={{ bgcolor: user?.avatarUrl ? "transparent" : "black", width: 56, height: 56, mb: 1 }}
            >
              {!user?.avatarUrl && (user?.name ? user.name.charAt(0).toUpperCase() : "U")}
            </Avatar>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Welcome, {user?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {user?.email}
            </Typography>
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

      <Dialog open={confirmLogout} onClose={handleCancelLogout}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout}>Cancel</Button>
          <Button onClick={handleConfirmLogout} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
