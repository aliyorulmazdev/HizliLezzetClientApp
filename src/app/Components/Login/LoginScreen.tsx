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
  email: Yup.string()
    .email("Invalid email address")
    .required("email is required"),
  password: Yup.string()
    .min(6, "password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{6,}$/,
      "password should have at least one uppercase, one lowercase, and one special character."
    )
    .required("password is required"),
});

const LoginScreen: React.FC = observer(() => {
  const { userStore } = useStore();
  const [showpassword, setShowpassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      userStore.login(values);
      const toastrMessage = `Login successful for ${values.email}!`;
      toast.success(toastrMessage);
    },
  });

  const handleTogglepassword = () => {
    setShowpassword(!showpassword);
  };

  return (
    <CenteredContainer>
      <StyledContainer>
        <Typography
          variant="h4"
          align="center"
          style={{ marginBottom: 20, fontWeight: "bold" }}
        >
          Login to Hızlı Lezzet
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
                type={showpassword ? "text" : "password"}
                label="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <Button onClick={handleTogglepassword}>
                      {showpassword ? "Hide" : "Show"}
                    </Button>
                  ),
                }}
              />
              <StyledButton type="submit" variant="contained">
                Log In
              </StyledButton>
            </form>
            <Link
              href="#"
              variant="body2"
              align="center"
              style={{ marginTop: 20, display: "block" }}
            >
              Dont you have an account? Register
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

export default LoginScreen;
