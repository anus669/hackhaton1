import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,sendEmailVerification,onAuthStateChanged,GoogleAuthProvider, signInWithPopup, signInWithRedirect} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
  
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
  const provider = new GoogleAuthProvider(app);
 
  


  let google = document.getElementById('google');
 
  google.addEventListener('click', () => {
    
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    window.location.href= "../chat/chat.html"
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

  
  

  });

  const signupForm = document.getElementById('form')
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const email = emailInput.value;
    const password = passwordInput.value;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        sendEmailVerification(userCredential.user);
        // showAlert('Verification email has been sent. Please check your inbox.')
        window.location.href="../chat/chat.html"
      })
      .catch((error) => {
        var errorCode = error.code;
        alert(error.code)
        // showAlert(errorCode)
      });
  });




//  function showAlert(message, type) {
//   const alertContainer = document.getElementById('alertContainer');

//   const alert = document.createElement('div');
//   alert.classList.add('alert');
//   alert.textContent = message;

//   alertContainer.appendChild(alert);

//   setTimeout(() => {
//     alert.classList.add('hide');
//     setTimeout(() => {
//       alert.remove();
//     }, 500);
//   }, 2000);
// }


// // Sticky alert   (help from chatgpt so that alert should be responsive)
// window.addEventListener('scroll', function () {
// const alertContainer = document.getElementById('alertContainer');
// const alert = alertContainer.querySelector('.alert');
// if (alert) {
//   const alertHeight = alert.offsetHeight;
//   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//   const windowHeight = window.innerHeight || document.documentElement.clientHeight;
//   const windowBottom = scrollTop + windowHeight;

//   if (windowBottom > alertContainer.offsetTop + alertHeight) {
//     alert.classList.add('sticky');
//   } else {
//     alert.classList.remove('sticky');
//   }
// }
// });

//   const provider = new GoogleAuthProvider();

//   let google = document.getElementById('google');
 
//   google.addEventListener('click', ()=>{
//  signInWithPopup(auth, provider)
//    .then((result) => {

//      const credential = GoogleAuthProvider.credentialFromResult(result);
//      const token = credential.accessToken;
   
//      const user = result.user;
     
//      window.location.href = '../chat/chat.html';
//    }).catch((error) => {
//      const errorCode = error.code;
//      const errorMessage = error.message;
//      const email = error.customData.email;
//      const credential = GoogleAuthProvider.credentialFromError(error);
//      // ...
//    });
 
//  })
 
 



