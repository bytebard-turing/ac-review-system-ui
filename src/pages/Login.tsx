import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useAuthContext } from "src/context";
import ApiService from "src/data/services";
import Button from '@mui/material/Button';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const Login = () => {
  const { handleAuthentication } = useAuthContext();
  const navigate = useNavigate();

  const handleGoogleLogin = useCallback(
    async (response: CredentialResponse ) => {
      if (response) {
        const result = await ApiService.login(response);
        debugger;
        handleAuthentication(result.token);
        navigate("/");
      }
    },
    [handleAuthentication, navigate]
  );

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
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Grid container>
              <Grid item xs>
                <GoogleLogin onSuccess={handleGoogleLogin} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
