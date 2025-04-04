import React, { useState, useEffect } from "react";
import { 
  AppBar, Toolbar, Typography, Avatar, Button, TextField, 
  Card, CardContent, Drawer, IconButton, List, ListItem, ListItemText 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, logout } from "../redux/userSlice"; 
import LogoutIcon from "@mui/icons-material/Logout";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [updatedUser, setUpdatedUser] = useState(user || { name: "", email: "" });
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user, navigate]);

  const handleSave = () => {
    dispatch(updateUser(updatedUser));
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
          
          <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "white" }}>
            <Avatar sx={{ bgcolor: "black" }}>{user?.name ? user.name[0].toUpperCase() : "U"}</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

     
      <Card sx={{ width: "100%", maxWidth: 500, boxShadow: 3, borderRadius: 3, p: 3, backgroundColor: "white", mt: 5 }}>
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>Profile</Typography>
          <div className="space-y-4">
            <TextField
              fullWidth
              label="Name"
              value={updatedUser.name}
              onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Email"
              value={updatedUser.email}
              onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
              sx={{ mb: 2 }}
            />

            <Button variant="contained" fullWidth sx={{ backgroundColor: "black" }} onClick={handleSave}>
              Update
            </Button>
          </div>
        </CardContent>
      </Card>

     
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Card sx={{ width: 250, p: 2, backgroundColor: "white", height: "100%" }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Menu</Typography>
            <List>
              <ListItem button onClick={handleLogout} sx={{ color: "red", fontWeight: "bold" }}>
                <LogoutIcon sx={{ mr: 1 }} />
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Drawer>
    </div>
  );
};

export default Profile;
