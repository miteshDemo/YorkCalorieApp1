import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Avatar, Button, TextField, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    if (storedName && storedEmail) {
      setUser({ name: storedName, email: storedEmail });
    } else {
      alert("No user found! Please register first.");
      navigate("/register");
    }
  }, [navigate]);

  const handleSave = () => {
    localStorage.setItem("name", user.name);
    localStorage.setItem("email", user.email);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen" style={{
      backgroundImage: "url('/src/assets/rectangle2.png')",
      backgroundColor: "#ECECEE",
      backgroundSize: "100vh",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right",
      width: "100%",
      height: "100vh",
    }}>

         <AppBar position="static" sx={{ backgroundColor: "#8CAE34" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  

                  <Typography variant="logo" sx={{ fontWeight: "800" }}>
                    York.IE Calories
                  </Typography>

                
                  <div style={{ display: "flex", gap: "24px", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
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
                        onClick={() => alert("History page not implemented yet")}
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


                  <Avatar sx={{ bgcolor: "black" }}>
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </Avatar>
                </Toolbar>
              </AppBar>


      <div className="flex justify-center items-center p-6 sm:p-10">
        <Card sx={{
          width: "100%",
          maxWidth: 500,
          boxShadow: 3,
          borderRadius: 3,
          p: 3,
          backgroundColor: "white"
        }}>
          <CardContent>
            <Typography variant="h4" sx={{fontWeight: "bold", mb: 2 }}>
              Profile
            </Typography>
            <div className="space-y-4">
              <TextField
                fullWidth
                label="Name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
              <TextField
                fullWidth
                label="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "black" }}
                onClick={handleSave}
              >
                Update
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
