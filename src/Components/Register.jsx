import React, { useState, useEffect } from "react";
import { 
  AppBar, Toolbar, Typography, TextField, Button, Box, Grid, Link, Paper, CircularProgress 
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";  

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user); 
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false); // State for animation before redirect

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/upload", { replace: true });
    }

    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [isLoggedIn, navigate]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setRedirecting(true); // Start loading animation before navigating
      dispatch(setUser({ name: values.name, email: values.email }));  

      setTimeout(() => {
        navigate("/upload");
      }, 2000); // 2-second delay for smooth animation
    },
  });

  if (loading || redirecting) {
    return (
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh", 
        backgroundColor: "#ECECEE",
        flexDirection: "column",
      }}>
        <CircularProgress size={80} thickness={5} color="primary" />
        {redirecting && (
          <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
            Redirecting to Upload Page...
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <div className="min-h-screen" style={{ 
        backgroundImage: "url('/src/assets/rectangle2.png')",
        backgroundColor: "#ECECEE", 
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        width: "100%",
        minHeight: "100vh"
    }}>
      <AppBar position="static" sx={{ backgroundColor: "#8CAE34" }}>
        <Toolbar className="flex justify-between">
          <Typography variant="logo" sx={{ fontWeight: "800", fontSize: "14px", color: "#FFFFFF" }}>
            York.IE Calories
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ width: "752px", padding: "50px" }}>
        <Typography variant="h4" sx={{ fontWeight: "800", mb: 1 }}>
          Love Food but Worried About Calories?
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "500", mb: 4 }}>
          We’re here to Help 🙂
        </Typography>

        <Paper elevation={2} sx={{ borderRadius: "8px", p: 3, backgroundColor: "#ffffff", boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)", maxWidth: 740 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>Full Name</Typography>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  placeholder="Enter first & last name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  variant="outlined"
                  InputProps={{ sx: { height: 50 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>Email</Typography>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  placeholder="Enter valid email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  variant="outlined"
                  InputProps={{ sx: { height: 50 } }}
                />
              </Grid>

              <Grid item xs={12} sm={8} display="flex" alignItems="center">
                <Typography variant="body2">
                  Already have an account? Please{' '}
                  <Link href="#" underline="hover">Sign In</Link>
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end" alignItems="center">
                <Button 
                  type="submit"  
                  variant="contained" 
                  sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#333' }, borderRadius: 1, px: 3 }}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </div>
  );
}
