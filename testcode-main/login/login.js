import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAuth,signInWithEmailAndPassword,onAuthStateChanged  ,GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
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
  const storage = getStorage(app);

  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');




 


loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
  
  
    const email = emailInput.value
    const password = passwordInput.value
  
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;


      window.location.href = "../chat/chat.html";
      

    //   if (user.emailVerified) {
    //     // Redirect to chat.html if email is verified
    //     window.location.href = "../chat/chat.html";
    //   } else {
    //     showAlert('Please verify your email before logging in.');
    //   }
    })
    .catch((error) => {
      const errorCode = error.code;
      // alert(errorCode);
      alert("mmmmm");
      showAlert(errorCode);
    });
  });
  




  function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
  
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.textContent = message;
  
    alertContainer.appendChild(alert);
  
    setTimeout(() => {
      alert.classList.add('hide');
      setTimeout(() => {
        alert.remove();
      }, 500);
    }, 2000);
  }
  

// Sticky alert   (help from chatgpt so that alert should be responsive)
window.addEventListener('scroll', function () {
  const alertContainer = document.getElementById('alertContainer');
  const alert = alertContainer.querySelector('.alert');
  if (alert) {
    const alertHeight = alert.offsetHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowBottom = scrollTop + windowHeight;

    if (windowBottom > alertContainer.offsetTop + alertHeight) {
      alert.classList.add('sticky');
    } else {
      alert.classList.remove('sticky');
    }
  }
});






















//  provide login user all data 
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const profile = {
      providerId: user.providerData[0].providerId,
      uid: user.providerData[0].uid,
      displayName: user.displayName || user.providerData[0].displayName || user.email,
      email: user.providerData[0].email,
      photoURL: user.photoURL || user.providerData[0].photoURL || '../../Assets/3d-render-cartoon-avatar-isolated_570939-71.jpg',
    };   



// Upload profile picture to Firebase Storage
let profilePicURL = '../../Assets/3d-render-cartoon-avatar-isolated_570939-71.jpg'; // Default profile picture URL

if (user.photoURL || user.providerData[0].photoURL) {
  // Useing  the user's provided profile picture
  profilePicURL = user.photoURL || user.providerData[0].photoURL;
}

const profilePicRef = ref(storage, `profile_pictures/${user.uid}`);
const profilePicBlob = await fetch(profilePicURL).then((response) => response.blob());
await uploadBytes(profilePicRef, profilePicBlob);



    localStorage.setItem('userProfile', JSON.stringify(profile)); // storing in local storege.
  } else {
    console.log("Not logged in");
  }
});






const provider = new GoogleAuthProvider();

 let google = document.getElementById('google');

 google.addEventListener('click', ()=>{
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    window.location.href = '../chat/chat.html';
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

})



//   for direct sigin of users who have logined before
  document.addEventListener('DOMContentLoaded', ()=>{
    auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
         showAlert('You have logined before, dont need for again login')

         setTimeout(()=>{
                  window.location.href = '../chat/chat.html'; // ./third%20Page/third.html
         },2000)
        
       
      }
    });
    
  })

