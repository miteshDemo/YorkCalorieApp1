import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, TextField, Button, Link, Paper, CircularProgress, Box } from "@mui/material";
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
    email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .test(
    "no-uppercase",
    "Email must be in lowercase",
    (value) => value === value?.toLowerCase()
  ),

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
      }, 4000);
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
        <div className="flex flex-col justify-center items-center h-full">
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
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      style={{
        backgroundImage: "url('/rectangle2.png')",
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
        </Toolbar>
      </AppBar>

      <div className="w-full max-w-screen-md px-4 sm:px-6 py-10">
        <Typography
          variant="h4"
          sx={{fontWeight: "800", mb: 1 }}
        >
          Love Food but Worried About Calories?
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: "500", mb: 3 }}   
        >
          We’re here to Help 🙂
        </Typography>

        <Paper
          elevation={2}
          className="rounded-lg p-4 sm:p-6 shadow-md"
          sx={{ backgroundColor: "#ffffff" }}
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div className="sm:col-span-1 flex items-center">
                <Typography variant="body2" sx={{ fontWeight: "bold"}}>
                  Please Register, If you are New here.
                </Typography>
              </div>

              <div className="sm:col-span-1 flex justify-end">
                <Button
                  type="submit"
                  variant="contained"
                  className="!bg-black hover:!bg-gray-800 px-4 py-2 rounded text-white min-w-[110px]"
                >
                  Register
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      </div>
    </motion.div>
  );
}
