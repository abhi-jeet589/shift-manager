import React, { useState } from "react";
import { Button, TextField, Card } from "@mui/material";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import ShiftComponent from "./ShiftComponent";
import HistoryComponent from "./HistoryComponent";
import "./styles.css";

const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoggedIn(true);
        setUserId(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setLoggedIn(false);
        setUserId(null);
      })
      .catch((error) => {});
  };

  return (
    <div className="auth-container">
      <Card elevation={3} className="login-form">
        {loggedIn ? (
          <>
            <Button onClick={handleSignOut}>Sign Out</Button>
            <ShiftComponent userId={userId} />
            <HistoryComponent />
          </>
        ) : (
          <>
            <TextField
              className="input-field"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              id="margin-dense"
              margin="dense"
            />
            <TextField
              className="input-field"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              id="margin-dense"
              margin="dense"
            />
            <Button
              className="sign-in-button"
              onClick={handleSignIn}
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default AuthComponent;
