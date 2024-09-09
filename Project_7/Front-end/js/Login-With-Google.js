// Login-With-Google.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv5vCoLdqubm_IJAOjNlgF7o9zo-1-VfE",
  authDomain: "login-3e8e4.firebaseapp.com",
  projectId: "login-3e8e4",
  storageBucket: "login-3e8e4.appspot.com",
  messagingSenderId: "251369161445",
  appId: "1:251369161445:web:ef0c157a6b0cdcdb1a0a0c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

// Get the Google login button element
const googleLogin = document.getElementById("google-login-btn");

if (googleLogin) {
  googleLogin.addEventListener("click", async function () {
    try {
      console.log("Button clicked, attempting login...");
      const result = await signInWithPopup(auth, provider);

      // The signed-in user info.
      const user = result.user;
      console.log("User:", user);

      // Extract user details
      const { uid, displayName, email, photoURL } = user;
      const [firstName, lastName] = displayName
        ? displayName.split(" ")
        : ["", ""];

      // Save user details to localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid,
          displayName,
          email,
          photoURL,
        })
      );

      // Prepare user data for API request
      const userData = {
        UserName: displayName,
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Passwword: uid, // using uid as password
        Image: photoURL,
      };
      // Send user data to the API
      const response = await fetch(
        "https://localhost:44339/api/Users/RegisterUsers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(userData).toString(),
        }
      );

      // Check for HTTP errors
      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      localStorage.setItem("Token", data.token);
      localStorage.setItem("User", data.user.userId);
      console.log("Login successful:", result);
      console.log("API Response:", data);

      // Redirect to a new page
      window.location.href = "index.html";
    } catch (error) {
      // Enhanced error handling
      console.error("Error during login or API request:", error);
      alert("Error during login. Please try again.");
    }
  });
} else {
  console.error("Login button not found");
}
