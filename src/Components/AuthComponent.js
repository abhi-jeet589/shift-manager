import React, { useState } from "react";
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
    <div className="container">
      <div className="sign-up-section">
        <h2 className="sign-up-title">New here?</h2>
        <button className="sign-up-button">Sign Up</button>
      </div>
      <div className="login-section">
      <h2 className="login-form-title">Login to Your Account</h2>
        <div className="login-form">
          {loggedIn ? (
            <>
              <button onClick={handleSignOut}>Sign Out</button>
              <ShiftComponent userId={userId} />
              <HistoryComponent />
            </>
          ) : (
            <>
              <input
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                className="input-field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button className="sign-in-button" onClick={handleSignIn}>
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
