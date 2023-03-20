import React, { useState } from "react";
import { auth, googleProvider } from "../firebase-Config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.photoURL);

  const SignIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const SignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const Logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Authentication</h2>
      
      <Box mt={4}>
        <TextField
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
      </Box>
      <Box mt={2}>
        <TextField
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
      </Box>
      <Box mt={3}>
        <Button variant="contained" onClick={SignIn}>
          Sign In
        </Button>
      </Box>
      <Box mt={1}>
        <Button variant="contained" onClick={SignInWithGoogle}>
          {" "}
          Google Sign In
        </Button>
      </Box>
      <Box mt={1}>
        <Button variant="contained" onClick={Logout}>
          Sign Out
        </Button>
      </Box>
    </div>
  );
};

export default Auth;
