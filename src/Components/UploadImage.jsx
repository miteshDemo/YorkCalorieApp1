import React, { useState, useEffect } from "react";
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
  const [caloriesData, setCaloriesData] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      fetchCaloriesData(imageUrl);
    }
  };

  const fetchCaloriesData = async (imageUrl) => {
    try {
      
      const response = await fetch(" APIURL ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });
      const data = await response.json();
      setCaloriesData(data);
    } catch (error) {
      console.error("Error fetching calorie data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100" style={{ backgroundImage: "url('/src/assets/farfalle-pasta-with-meatballs-spinach-sauce-with-fried-chickpeas-removebg-preview.png')", 
                                                         backgroundSize: "100vh",
                                                         backgroundRepeat:"no-repeat",
                                                         backgroundPosition:"right" }}>
     
      <AppBar position="static" sx={{ backgroundColor :"green"}}>
        <Toolbar className="flex justify-between">
          <Typography variant="h6" sx={{ fontFamily : "serif", fontWeight:"bold"}}>
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

      <h2 class="text-4xl font-sans font-extrabold dark:text-white p-7 m-10">Upload Your Meal Snap & Uncover <br /> the Calories.  </h2>

      <div className="grid grid-cols-2 gap-4 p-20">
        <div className="flex flex-col justify-center items-left">
        
          <UploadContainer>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="upload-button"
            />
            <label htmlFor="upload-button" className="cursor-pointer">
              <CloudUpload fontSize="large" className="text-gray-500" />
              <Typography variant="h6" sx={{ fontFamily : "serif", fontWeight : "bold", padding :"10px"}}>
                Drag or upload your meal pic here
              </Typography>
              <Button variant="contained" component="span" sx={{ fontFamily : "serif", fontWeight : "bold", backgroundColor : "black"}} >
                Upload File
              </Button>
            </label>
          </UploadContainer>
          <Typography variant="caption" sx={{ fontFamily : "serif", fontWeight : "bold", color : "gray", textAlign : "center"}}>
            Format supported: JPEG, PNG | Max file size: 5MB
          </Typography>
        </div>

        <div className="relative">
          {image && <img src={image} alt="Uploaded" className="w-full h-auto rounded-lg" />}
          {caloriesData && (
            <div className="mt-4">
              <Typography variant="h6">Calorie Breakdown</Typography>
              {caloriesData.items.map((item, index) => (
                <Card key={index} className="mt-2">
                  <CardContent>
                    <Typography variant="body1">{item.name}: {item.calories} kcal</Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
