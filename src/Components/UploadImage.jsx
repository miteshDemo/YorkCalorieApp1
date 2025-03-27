import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Avatar, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const UploadContainer = styled("div")({
  border: "2px dashed #ccc",
  padding: "20px",
  textAlign: "center",
  borderRadius: "10px",
  background: "#f9f9f9",
  width: "100%"
});

export default function UploadPage() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [calorieResult, setCalorieResult] = useState(null);
  const [loading, setLoading] = useState(false);


  const uploadImage = async (file) => {
    setLoading(true);
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

   
      const formattedData = {};
      for (const [food, calories] of Object.entries(data)) {
        formattedData[food] = {
          Calories: typeof calories === 'object' ? calories.Calories : calories,
          Quantity: typeof calories === 'object' && calories.Quantity ? calories.Quantity : "-", 
        };
      }
      setCalorieResult(formattedData);

    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setLoading(false);
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
    setLoading(false);
  };

  return (
    <div className="min-h-screen"
      style={{
        backgroundImage: "url('/src/assets/rectangle2.png')",
        backgroundColor: "#ECECEE",
        backgroundSize: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        width: "100%",
        maxWidth: "1440px",
        height: "auto",
        minHeight: "1024px",
        margin: "0 auto"
      }}>

      <AppBar position="static" sx={{ backgroundColor: "#8CAE34" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="logo" sx={{ fontWeight: "800" }}>
            York.IE Calories
          </Typography>
          <div style={{ display: "flex", gap: "24px", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            <Button color="inherit" sx={{ fontWeight: "bold", textTransform: "none" }} onClick={() => navigate("/upload")}>Home</Button>
            <Button color="inherit" sx={{ fontWeight: "bold", textTransform: "none" }} onClick={() => navigate("/history")}>History</Button>
            <Button color="inherit" sx={{ fontWeight: "bold", textTransform: "none" }} onClick={() => navigate("/profile")}>Profile</Button>
          </div>
          <Avatar alt="U" sx={{ bgcolor: "black" }} />
        </Toolbar>
      </AppBar>

      <Typography variant="subtitle1" sx={{
        fontWeight: "800",
        fontSize: { xs: "28px", sm: "36px", md: "44px" },
        lineHeight: { xs: "36px", sm: "50px", md: "60px" },
        color: "#000000",
        width: "732px",
        padding: { xs: "10px", md: "20px" }
      }}>
        Love Food but Worried About Calories?
      </Typography>

      <Typography sx={{ width: "100%", maxWidth: "752px", padding: { xs: "10px", md: "20px" }, mt: 2 }}>
        {!image && !loading && (
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
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                Drag or upload your meal pic here
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "400", color: "#ADADAD" }}>
                or
              </Typography>
              <Button variant="h5" component="span" sx={{ backgroundColor: "#000000", color: "#FFFFFF" }}>
                <Typography variant="h5">Upload File</Typography>
              </Button>
            </label>
          </UploadContainer>
        )}

        {loading && (
          <div className="flex justify-center items-center" style={{ height: "200px" }}>
            <CircularProgress size={60} color="success" />
          </div>
        )}
      </Typography>

      {image && calorieResult && !loading && (
        <div className="mt-8 text-center">
          <img src={image} alt="Uploaded" className="w-full max-w-xl mx-auto rounded-lg" />

          <TableContainer component={Paper} sx={{ mt: 4, maxWidth: "600px", margin: "0 auto", border: "1px solid #ccc" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Captured Food</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Calories</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(calorieResult).map(([food, details]) => (
                  <TableRow key={food}>
                    <TableCell sx={{ fontWeight: "bold" }}>{food}</TableCell>
                    <TableCell>{details.Calories}</TableCell>
                    <TableCell>{details.Quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button variant="outlined" onClick={handleReupload} sx={{ mt: 2, backgroundColor: "red", color: "white" }}>
            Re-upload Image
          </Button>
        </div>
      )}
    </div>
  );
}
