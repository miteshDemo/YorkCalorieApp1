import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Avatar, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer, Box } from "@mui/material";
import { CloudUpload, Logout } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const UploadContainer = styled("div")({
  border: "1px dashed #8CAE34",
  padding: "30px",
  textAlign: "center",
  borderRadius: "10px",
  background: "#FFFFFF",
  width: "100%",
  maxWidth: "752px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export default function UploadPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user || null);
  const [image, setImage] = useState(null);
  const [calorieResult, setCalorieResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/upload");
    }
  }, [user, navigate]);

  const uploadImage = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://yorkcaloriapp.onrender.com", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch calorie data");
      }

      const data = await response.json();
      const localImageUrl = URL.createObjectURL(file);
      setImage(localImageUrl);

      if (Array.isArray(data)) {
        const formattedData = data.map((item) => ({
          foodName: item.foodName || "Unknown Food",
          calories: item.calories || "N/A",
        }));

        setCalorieResult(formattedData);
      } else {
        setCalorieResult([]);
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      setCalorieResult([]);
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
    setCalorieResult([]);
    setLoading(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/src/assets/rectangle2.png')",
        backgroundColor: "#ECECEE",
        backgroundSize: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        width: "100%",
        maxWidth: "1440px",
        minHeight: "1024px",
        margin: "0 auto",
      }}
    >
      
      <AppBar position="static" sx={{ backgroundColor: "#8CAE34", boxShadow: 3 }}>
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

          <div className="flex gap-6">
            <Button
              sx={{ color: "#fff", fontWeight: "bold", textTransform: "none" }}
              onClick={() => navigate("/upload")}
            >
              Home
            </Button>
            <Button
              sx={{ color: "#fff", fontWeight: "bold", textTransform: "none" }}
              onClick={() => navigate("/history")}
            >
              History
            </Button>
            <Button
              sx={{ color: "#fff", fontWeight: "bold", textTransform: "none" }}
              onClick={() => navigate("/profile")}
            >
              Profile
            </Button>
          </div>
        </Toolbar>
      </AppBar>

     
      <Typography
  variant="subtitle1"
  sx={{
    fontWeight: 800,
    fontSize: {
      xs: "24px",  
      sm: "32px",  
      md: "40px",  
      lg: "44px",  
    },
    lineHeight: {
      xs: "32px",
      sm: "40px",
      md: "50px",
      lg: "60px",
    },
    color: "#000000",
    width: "100%",
    maxWidth: "732px",
    padding: { xs: "10px", md: "20px" },
  }}
>
  Love Food but Worried About Calories?
</Typography>


      <Typography
        sx={{
          width: "100%",
          maxWidth: "752px",
          padding: { xs: "10px", md: "20px" },
          mt: 2,
        }}
      >
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
              <Typography
                variant="body2"
                sx={{ fontWeight: "400", color: "#ADADAD" }}
              >
                or
              </Typography>
              <Button
                variant="h5"
                component="span"
                sx={{ backgroundColor: "#000000", color: "#FFFFFF" }}
              >
                <Typography variant="h5">Upload File</Typography>
              </Button>
            </label>
          </UploadContainer>
        )}

        {loading && (
          <div
            className="flex justify-center items-center"
            style={{ height: "200px" }}
          >
            <CircularProgress size={60} color="success" />
          </div>
        )}
      </Typography>

     
      {image && calorieResult.length > 0 && !loading && (
        <div className="mt-8 text-center">
          <img
            src={image}
            alt="Uploaded"
            className="w-full max-w-xl mx-auto rounded-lg"
          />
          <TableContainer
            component={Paper}
            sx={{
              mt: 4,
              maxWidth: "600px",
              margin: "0 auto",
              border: "1px solid #ccc",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Captured Food
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Calories</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {calorieResult.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {item.foodName}
                    </TableCell>
                    <TableCell>{item.calories}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="outlined"
            onClick={handleReupload}
            sx={{ mt: 2, backgroundColor: "red", color: "white" }}
          >
            Re-upload Image
          </Button>
        </div>
      )}
    </div>
  );
}
