import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Image } from "semantic-ui-react";
import { useStore } from "../../stores/store";

const CenteredContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const StyledContainer = styled(Container)({
  width: "100%",
  padding: 30,
  borderRadius: 15,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
});

const StyledButton = styled(Button)({
  width: "100%",
  padding: 10,
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: 5,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#45a049",
  },
});

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  userName: Yup.string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{6,}$/,
      "Password should have at least one uppercase, one lowercase, and one special character."
    )
    .required("Password is required"),
});


const RegisterScreen: React.FC = observer(() => {
  const [showPassword, setShowPassword] = useState(false);
  const { userStore } = useStore();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      userStore.register(values);
      const toastrMessage = `Registration successful for ${values.userName} (${values.email})!`;
      toast.success(toastrMessage);
    },
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <CenteredContainer>
      <StyledContainer>
        <Typography
          variant="h4"
          align="center"
          style={{ marginBottom: 20, fontWeight: "bold" }}
        >
          Sign Up to Hızlı Lezzet
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 25,
                overflow: "hidden",
              }}
            >
              <Image src="https://i.ibb.co/rcqrXjv/kevin-grieve-Q-5-COo-D1k4-I-unsplash.jpg" />
            </div>
          </Grid>
          <Grid item xs={6}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                label="First Name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                label="Last Name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                label="Username"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                error={
                  formik.touched.userName && Boolean(formik.errors.userName)
                }
                helperText={formik.touched.userName && formik.errors.userName}
              />
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                label="Your email"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <Button onClick={handleTogglePassword}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  ),
                }}
              />
              <StyledButton type="submit" variant="contained">
                Sign Up
              </StyledButton>
            </form>
            <Link
              href="#"
              variant="body2"
              align="center"
              style={{ marginTop: 20, display: "block" }}
            >
              Have an account? Log In
            </Link>
            <Typography
              variant="body2"
              align="center"
              style={{ marginTop: 20 }}
            >
              Simplify Your Restaurant Management with Us!
            </Typography>
          </Grid>
        </Grid>
      </StyledContainer>
      <ToastContainer />
    </CenteredContainer>
  );
});

export default RegisterScreen;
