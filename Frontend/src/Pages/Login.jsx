import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin, setAuthentication } from "../utils/auth";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";

const defaultTheme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ifError, setifError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim().length === 0) {
      setifError(true);
      setError("Email Con not be empty!");
      return;
    }
    let isEmailValid = email.includes("@") && email.includes(".com");
    if (isEmailValid === false) {
      setError("Enter a Valid Email ID!");
      setifError(true);
      return;
    }

    if (password.trim().length === 0) {
      console.log("3");
      setifError(true);
      setError("Password Con not be empty");
      return;
    } else if (password.trim().length <= 8) {
      setifError(true);
      setError("Minimum password length is 8 characters");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4001/api/login", {
        email,
        password,
      });
      console.log("Sign-in result:", response);
      if (response.status === 200) {
        toast.success("Account logged in Successfully");
        setifError(true);
        setError("Login Successful!");
        setAuthentication(response.data.token);
        navigate("/dashboard");
      } else if (response.status === 203) {
        setifError(true);
        setError(response.data.message);
        return;
      } else {
        setifError(true);
        setError("Username is Not registered or this is student account");
        return;
      }
    } catch (error) {
      setifError(true);
      setError(error);
    }
  };
  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();
      console.log(loggedIn);

      if (loggedIn.auth) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    };

    authenticate();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
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
            Sign in
          </Typography>
          {ifError && <Alert severity="error">{error}</Alert>}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              type="email"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/reset" to="/reset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link to="/student/login" href="/student/login" variant="body2">
                  {"Are You a Student? Login Here"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
