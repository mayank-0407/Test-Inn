import { useNavigate } from "react-router-dom";
// import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin, setAuthentication } from "../utils/auth";

const defaultTheme = createTheme();

export default function Test() {
  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       email: data.get("email"),
  //       password: data.get("password"),
  //     });
  //   };

  const [error, setError] = useState("");
  const [ifError, setifError] = useState(false);
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const name = fname.concat(" ", lname);

    let isValid = false;
    if (name.trim().length === 0) {
      console.log("1");
      setError("Please Enter a Name");
      isValid = false;
      setifError(true);
      return;
    }
    let isEmailValid = email.includes("@") && email.includes(".com");
    if (isEmailValid === false) {
      setError("Enter Valid Gmail id (Email)!");
      isValid = false;
      setifError(true);
      return;
    }

    if (password.trim().length === 0) {
      console.log("3");
      isValid = false;
      setifError(true);
      setError("Please Enter password");
      return;
    }
    try {
      if (confirmPassword !== password) {
        setError("Both Passwords must be same!");
        setifError(true);
        return;
      }
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()-+=^]).{8,15}$/;
      console.log(passwordRegex.test(password));
      if (!passwordRegex.test(password)) {
        console.log("Password is not valid");
        setError(
          "Password Should have min 8 and max 15 characters, one digit, one uppercase, one lowercase and one special alphabet. No white space allowed !"
        );
        setifError(true);
        return;
      }
      const response = await axios.post("http://localhost:4001/api/signup", {
        name,
        email,
        password,
      });
      console.log("Sign-up result:", response);
      if (response.status === 200) {
        toast.success("Account Created Successfully");
        console.log("Sign-up result:", response);
        navigate("/");
      } else if (response.status === 203) {
        setError(response.data.message);
        setifError(true);
        // console.error("Sign-up error:", response.data.message);
      }
    } catch (error) {
      toast.error("Error");
      setError("Error");
      setifError(true);
      console.error("Sign-up error:", error);
    }
  }

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();
      console.log(loggedIn);

      if (loggedIn.auth) {
        navigate("/dashboard");
      }
    };
    authenticate();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {ifError && <Alert severity="error">{error}</Alert>}

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="fname"
                  name="fname"
                  value={fname}
                  onChange={(e) => setfName(e.target.value)}
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lname"
                  name="lname"
                  value={lname}
                  onChange={(e) => setlName(e.target.value)}
                  label="Last Name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email Address"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Click Here to Verify That you are a Human."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
