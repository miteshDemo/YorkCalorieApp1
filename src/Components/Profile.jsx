import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Avatar, Button, TextField, Card, CardContent } from "@mui/material";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  
  const handleSave = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar position="static" sx={{ backgroundColor :"green"}}>
        <Toolbar className="flex justify-between">
          <Typography variant="h6" sx={{ fontFamily : "serif", fontWeight:"bold"}}>
            York.IE Calories
          </Typography>
          <div className="flex space-x-6">
            <Button color="inherit" sx={{ fontFamily : "serif", fontWeight:"bold"}}>Home</Button>
            <Button color="inherit" sx={{ fontFamily : "serif", fontWeight:"bold"}}>History</Button>
            <Button color="inherit" sx={{ fontFamily : "serif", fontWeight:"bold"}}>Profile</Button>
            <Avatar sx={{ bgcolor: "black" }}>{name ? name[0].toUpperCase() : "U"}</Avatar>
          </div>
        </Toolbar>
      </AppBar>

      <div className="flex justify-center items-center p-10">
        <Card className="w-full max-w-xl shadow-lg rounded-lg p-4 bg-white">
          <CardContent>
            <Typography variant="h5" className="mb-4" sx={{ fontFamily: "serif", fontWeight: "bold" }}>
              Profile
            </Typography>
            <div className="space-y-4">
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: "black" }}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
