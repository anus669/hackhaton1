import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import {getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
  import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
  const firebaseConfig = {
    apiKey: "AIzaSyCo9jfH9hcr2TdvAVD3Bxbwme8VCI-BNb4",
    authDomain: "saylani-hackathon-6dd41.firebaseapp.com",
    projectId: "saylani-hackathon-6dd41",
    storageBucket: "saylani-hackathon-6dd41.appspot.com",
    messagingSenderId: "192571999374",
    appId: "1:192571999374:web:21e8ffb61bf0a99126f5df",
    measurementId: "G-N82DESNP8D"
  };







  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  

  let signout = document.getElementById("signout");
signout.addEventListener("click", function () {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    console.log("User signed out successfully.");
    window.location.href="../login/index.html"
    // You can add any additional actions you want to perform after signing out here.
  }).catch(function (error) {
    // An error happened.
    console.error("Sign-out error: ", error);
  });
});

  
  
  
  const button = document.getElementById('update');

  button.addEventListener("click", async function() {
      const oldPasswordInput = document.getElementById('oldpassword').value;
      const newPasswordInput = document.getElementById('newpassword').value;
      const user = auth.currentUser;
      const oldPassword = oldPasswordInput;
      const newPassword = newPasswordInput;
  
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
  
      try {
          // Reauthenticate the user
          await reauthenticateWithCredential(user, credential);
  
          // Change the password
          await updatePassword(user, newPassword);
  
          alert("Password changed successfully");
      } catch (error) {
          alert("Failed to change password: " + error.message);
      }
  });
  document.addEventListener("DOMContentLoaded", function() {
    // Your JavaScript code here
});



