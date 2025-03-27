import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Avatar, Button, Card, CardContent, CircularProgress } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const UploadContainer = styled("div")({
  border: "2px dashed #ccc",
  padding: "20px",
  textAlign: "center",
  borderRadius: "10px",
  background: "#f9f9f9",
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
      const response = await fetch("", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      const localImageUrl = URL.createObjectURL(file);
      setImage(localImageUrl);
      setCalorieResult(data);
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

        <Typography variant="caption" sx={{ fontWeight: "bold", color: "gray", textAlign: "center", display: "block", mt: 1 }}>
          Format supported: JPEG | Max file size: 5MB
        </Typography>
      </Typography>

     
      <div className="relative flex items-center justify-center">
        {loading && <CircularProgress size={60} color="success" />}
        {!loading && image && (
          <>
            <img src={image} alt="Uploaded" className="w-full h-auto rounded-lg" />
            {calorieResult && (
              <div className="mt-4">
                <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>Calorie Breakdown</Typography>
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
          </>
        )}
      </div>
    </div>
  );
}
