import React from "react";
import { useAuthContext } from "./context";
import { Login } from "./pages/Login";
import { Home } from "./pages/home";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
const googleClientId = process.env.GOOGLE_CLIENT_ID;

export const App = () => {
  const { isAuthenticated } = useAuthContext();
  return (
    <GoogleOAuthProvider clientId={googleClientId as string} >
      {isAuthenticated ? <Home /> : <Login />}
    </GoogleOAuthProvider>
  );
};
