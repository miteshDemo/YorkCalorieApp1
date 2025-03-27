import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Card, CardContent, TextField, Button, Box, Avatar } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";  

export default function App() {

  const navigate = useNavigate(); 

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem("isLoggedIn", "true");   
      navigate("/upload");                         
    },
  });

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
              <Typography variant="h6" sx={{ fontFamily : "serif", fontWeight:"bold"}}>
                York.IE Calories
              </Typography>
            </Toolbar>
          </AppBar>

      <Typography sx={{ width : '752px', height : "446px", top : "159px", left : "104px", padding : "10px", gap : '40px'}}>
        <div>
          <Typography variant="h1" sx={{ fontFamily : "inter", fontWeight : "800", fontSize : "44px", lineHeight : "60px", letterSpacing : "0%", color : "#000000", width : "732px", height : "120px"}}>
          Love Food but Worried About Calories? 
               </Typography> 
          <br />
           <Typography variant="h2" sx={{ fontFamily : "inter", fontWeight : "500", fontSize : "30px", lineHeight : "40px", letterSpacing : "0%", color : "#000000", width : "732px", height : "40px"}}>
                we're are here to help 😄
                </Typography>
        </div>
      </Typography>

      <div className="justify-center items-center p-10">
        <Card className="w-full max-w-2xl shadow-lg rounded-lg p-4 bg-white">

          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-6">

              <Box className="flex gap-4">
                <TextField
                  fullWidth
                  label="Full First Name & Last Name"
                  name="name"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />

                <TextField
                  fullWidth
                  label="Enter Valid Email"
                  name="email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Box>

              <Button sx={{ backgroundColor: "black", color: "white" }}
                variant="contained"
                type="submit"
                className="mt-2"
              >
                Sign Up
              </Button>
            </form>
          </CardContent>

        </Card>
      </div>

    </div>
  );
}


