import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Avatar, Button, Card, CardContent } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const UploadContainer = styled("div")({
  border: "2px dashed #ccc",
  padding: "20px",
  textAlign: "center",
  borderRadius: "10px",
  background: "#f9f9f9",
});

export default function App() {
  const [image, setImage] = useState(null);
  const [calorieResult, setCalorieResult] = useState(null);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("https://yorkcaloriapp.onrender.com", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("API Response:", data);
      const localImageUrl = URL.createObjectURL(file);
      setImage(localImageUrl);
      setCalorieResult(data);
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleReupload = () => {
    setImage(null);
    setCalorieResult(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundImage: "url('/src/assets/rectangle2.png')",
                                           backgroundColor : "#ECECEE", 
                                           backgroundSize: "100vh",
                                           backgroundRepeat:"no-repeat",
                                           backgroundPosition:"right",
                                           width : "1440px",
                                           height : "1024px",
                                           top : "116px",
                                           left : "155px" }}>
      <AppBar position="static" sx={{ backgroundColor :"#8CAE34"}}>
        <Toolbar className="flex justify-between">
          <Typography variant="logo" sx={{ fontFamily : "lato", fontWeight:"800", width : "139px", height : "28px", fontSize : "17px", lineHeight : "28px", letterSpacing : "4%", textAlign : "center", color : "#FFFFFF" }}>
            York.IE Calories
          </Typography>
           <div className="flex space-x-6">
                          <Button color="inherit" sx={{ fontFamily : "serif", fontWeight:"bold"}}>Home</Button>
                          <Button color="inherit" sx={{ fontFamily : "serif", fontWeight:"bold"}}>History</Button>
                          <Button color="inherit" sx={{ fontFamily : "serif", fontWeight:"bold"}}>Profile</Button>
                          <Avatar alt="M" src="/static/images/avatar/1.jpg" />
                        </div>
        </Toolbar>
      </AppBar>

      <div className="justify-between items-center p-10">
              <div>
                <Typography variant="h1" sx={{ fontFamily : "inter", fontWeight : "800", fontSize : "44px", lineHeight : "60px", letterSpacing : "0%", color : "#000000", width : "732px", height : "120px"}}>
                     Love Food but Worried About Calories?
                     </Typography> 
                
              </div>
            </div>

      <div className="grid grid-cols-2 gap-4 p-20">
  
        <Typography sx={{width : "752px", height : "446px", top : "159px", left : "104px", padding : "10px", gap : "40px"}}>
          <UploadContainer sx={{ width : "732px", height : "194px", borderRadius : "8px", padding : "30px", gap : "10px", color : "#FFFFFF"}}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="upload-button"
            />
            <label htmlFor="upload-button" className="cursor-pointer">
              <CloudUpload fontSize="large" className="text-gray-500" />
              <Typography variant="body1" sx={{ fontFamily : "inter", fontWeight : "500", fontSize : "14px", lineHeight : "22px", letterSpacing : "0%", textAlign : "center", color : "#111827"}}>
                Drag or upload your meal pic here
              </Typography>
              <Typography variant="body2" sx={{ fontFamily : "inter", fontWeight : "400", fontSize : "14px", lineHeight : "22px", letterSpacing : "0%", textAlign : "center", color : "#ADADAD" }}>
                or
              </Typography>
              <Button variant="h5" component="span" sx={{backgroundColor:"#000000"}}>
                <Typography variant="h5" >
                Upload File
                </Typography>
              </Button>
            </label>
          </UploadContainer>
          <Typography variant="caption" sx={{ fontFamily : "serif", fontWeight : "bold", color : "gray", textAlign : "center"}}>
            Format supported: JPEG| Max file size: 5MB
          </Typography>
        </Typography>

        <div className="relative">
          {image && <img src={image} alt="Uploaded" className="w-full h-auto rounded-lg" />}
          {calorieResult && (
            <div className="mt-4">
              <Typography variant="h6">Calorie Breakdown</Typography>
              {Object.entries(calorieResult).map(([key, value], index) => (
                <Card key={index} className="mt-2">
                  <CardContent>
                    <Typography variant="h6">{key}</Typography>
                    {typeof value === "object" ? (
                      Object.entries(value).map(([subKey, subValue]) => (
                        <Typography key={subKey} variant="body2" sx={{ pl: 2 }}>
                          {subKey}: {subValue}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body1">{value}</Typography>
                    )}
                  </CardContent>
                </Card>
              ))}
              <Button variant="outlined" color="secondary" onClick={handleReupload} className="mt-4">
                Re-upload Image
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
