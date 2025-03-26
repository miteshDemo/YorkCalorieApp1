import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Card, CardContent, TextField, Button, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";   // <--- ADD THIS

export default function App() {

  const navigate = useNavigate();  // <--- ADD THIS

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
      localStorage.setItem("isLoggedIn", "true");   // <--- SAVE LOGIN
      navigate("/upload");                         // <--- REDIRECT TO UPLOAD PAGE
    },
  });

  return (
    <div className="min-h-screen bg-gray-100"
      style={{
        backgroundImage: "url('/src/assets/farfalle-pasta-with-meatballs-spinach-sauce-with-fried-chickpeas-removebg-preview.png')",
        backgroundSize: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right"
      }}
    >

      <AppBar position="static" sx={{ backgroundColor: "green" }}>
        <Toolbar className="flex justify-between">
          <Typography variant="h6" sx={{ fontFamily: "serif", fontWeight: "bold" }}>
            York.IE Calories
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="justify-between items-center p-10">
        <div>
          <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
            Love Food but Worried About <br /> Calories ?
          </h2>
          <br />
          <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-white">
            We're Here to Help 😄
          </h2>
        </div>
      </div>

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
