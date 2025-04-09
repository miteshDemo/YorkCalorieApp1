import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Link,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { motion } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (user || storedUser) {
      if (storedUser && !user) {
        dispatch(setUser(JSON.parse(storedUser)));
      }
      navigate("/upload", { replace: true });
    }

    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [user, navigate, dispatch]);

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
      setRedirecting(true);

      const userData = { name: values.name, email: values.email };
      dispatch(setUser(userData));
      localStorage.setItem("user", JSON.stringify(userData));

      setTimeout(() => {
        navigate("/upload");
      }, 2000);
    },
  });

  if (loading || redirecting) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: redirecting ? 0 : 1,
          y: redirecting ? -50 : 0,
          scale: redirecting ? 0.95 : 1,
        }}
        transition={{ duration: 1 }}
        style={{ height: "100vh", backgroundColor: "#ECECEE" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <CircularProgress size={80} thickness={5} color="primary" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Typography
              variant="h6"
              sx={{ mt: 2, fontWeight: "bold", color: "#333" }}
            >
              {redirecting ? "Redirecting to Upload Page..." : "Loading..."}
            </Typography>
          </motion.div>
        </Box>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      style={{
        backgroundImage: "url('/src/assets/rectangle2.png')",
        backgroundColor: "#ECECEE",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#8CAE34" }}>
        <Toolbar>
          <Typography
            variant="logo"
            sx={{ fontWeight: "800", color: "#FFFFFF" }}
          >
            York.IE Calories
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ width: "752px", padding: "40px" }}>
        <Typography variant="h4" sx={{ fontWeight: "800", mb: 1 }}>
          Love Food but Worried About Calories?
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "500", mb: 3 }}>
          We’re here to Help 🙂
        </Typography>

        <Paper
          elevation={2}
          sx={{
            borderRadius: "8px",
            p: 3,
            backgroundColor: "#ffffff",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            maxWidth: 740,
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  id="name"
                  name="name"
                  placeholder="Enter first & last name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="Enter valid email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={8} display="flex" alignItems="center">
                <Typography variant="body2">
                  Already have an account? Please{" "}
                  <Link href="#" underline="hover">
                    Sign In
                  </Link>
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    "&:hover": { backgroundColor: "#333" },
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    minWidth: "110px",
                  }}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </motion.div>
  );
}
