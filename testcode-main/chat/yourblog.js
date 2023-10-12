// // import {  getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// // import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// // import { firestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCo9jfH9hcr2TdvAVD3Bxbwme8VCI-BNb4",
    authDomain: "saylani-hackathon-6dd41.firebaseapp.com",
    projectId: "saylani-hackathon-6dd41",
    storageBucket: "saylani-hackathon-6dd41.appspot.com",
    messagingSenderId: "192571999374",
    appId: "1:192571999374:web:21e8ffb61bf0a99126f5df",
    measurementId: "G-N82DESNP8D"
  };
  
  
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function rendermsg() {
  const container = document.querySelector(".main");

  db.collection("muzammil")
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      container.innerHTML = "";

      if (querySnapshot.empty) {
        container.innerText = "No chat found";
      } else {
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          const maindiv = document.createElement("div");
          maindiv.className = "datamain";
          container.appendChild(maindiv);

          const tittlediv = document.createElement("div");
          tittlediv.className = "tittlediv";
          maindiv.appendChild(tittlediv);

          const twothings = document.createElement("div");
          twothings.className = "twotings";
          tittlediv.appendChild(twothings);

          const username = document.createElement("h2");
          username.className = "userdata";
          username.innerText = data.tittle;
          twothings.appendChild(username);

          const timediv = document.createElement("p");
          timediv.className = "timediv";

          const messageTimestamp = data.timestamp.toDate();
          const currentTime = new Date();
          const timeDifference = currentTime - messageTimestamp;
          const minutesAgo = Math.floor(timeDifference / 60000);

          if (minutesAgo < 1) {
            timediv.innerText = "Just now";
          } else if (minutesAgo === 1) {
            timediv.innerText = "1 minute ago";
          } else if (minutesAgo < 60) {
            timediv.innerText = `${minutesAgo} minutes ago`;
          } else if (minutesAgo < 1440) {
            const hoursAgo = Math.floor(minutesAgo / 60);
            timediv.innerText = `${hoursAgo} hours ago`;
          } else {
            const daysAgo = Math.floor(minutesAgo / 1440);
            timediv.innerText = `${daysAgo} days ago`;
          }

          twothings.appendChild(timediv);

          const blogdiv = document.createElement('div');
          blogdiv.className = "blogdiv";
          maindiv.appendChild(blogdiv);

          const contentblog = document.createElement("p");
          contentblog.className = "blog";
          contentblog.innerText = data.text;
          blogdiv.appendChild(contentblog);

          container.insertBefore(maindiv, container.firstChild);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching chat:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  rendermsg();
});

















































































// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const auth = firebase.auth();
// let storage; // Declare storage here

// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         // Firebase is initialized, you can now access storage
//         storage = firebase.storage();
//     } else {
//         // User is not logged in
//         // Handle this case or redirect to a login page
//     }
// });

// document.addEventListener("DOMContentLoaded", function () {
//     rendermsg();
// });

// const button = document.getElementById("button");

// button.addEventListener("click", function () {
//     const tittle = document.getElementById("tittle").value;
//     const text = document.getElementById("input").value;
//     const imge = document.getElementById("imageinput").files[0]; // Get the selected image file
//     const userId = auth.currentUser ? auth.currentUser.uid : null;

//     if (!userId) {
//         alert("Please log in to add a post.");
//         return;
//     }

//     // Upload the image to Firebase Storage
//     if (imge) {
//         const timestamp = Date.now();
//         const filename = `${timestamp}_${imge.name}`;
//         const storageRef = storage.ref(`user-images/${filename}`);

//         storageRef.put(imge)
//             .then((snapshot) => {
//                 // Get the download URL for the image
//                 return snapshot.ref.getDownloadURL();
//             })
//             .then((imageUrl) => {
//                 // Add the new message to the database with the image URL
//                 return db.collection("muzammil").add({
//                     timestamp: timestamp,
//                     tittle: tittle,
//                     text: text,
//                     userId: userId,
//                     imageUrl: imageUrl // Store the image URL
//                 });
//             })
//             .then(() => {
//                 console.log("Message added successfully");
//                 rendermsg(); // Refresh the messages
//             })
//             .catch((error) => {
//                 console.error("Error adding message:", error);
//             });
//     } else {
//         // If no image is selected, add the message without an image URL
//         db.collection("muzammil")
//             .add({
//                 timestamp: timestamp,
//                 tittle: tittle,
//                 text: text,
//                 userId: userId
//             })
//             .then(() => {
//                 console.log("Message added successfully");
//                 rendermsg(); // Refresh the messages
//             })
//             .catch((error) => {
//                 console.error("Error adding message:", error);
//             });
//     }

//     // Clear input fields
//     document.getElementById("tittle").value = "";
//     document.getElementById("input").value = "";
// });

// function rendermsg() {
//     const container = document.querySelector(".main");

//     db.collection("muzammil")
//         .orderBy("timestamp", "desc")
//         .get()
//         .then((querySnapshot) => {
//             container.innerHTML = "";

//             if (querySnapshot.empty) {
//                 container.innerText = "No chat found";
//             } else {
//                 const reversedDocs = querySnapshot.docs.reverse();

//                 reversedDocs.forEach((doc) => {
//                     const data = doc.data();

//                     const maindiv = document.createElement("div");
//                     maindiv.className = "datamain";
//                     container.appendChild(maindiv);

//                     const tittlediv = document.createElement("div");
//                     tittlediv.className = "tittlediv";
//                     maindiv.appendChild(tittlediv);

//                     // Create an <img> element for the user image
//                     const userImage = document.createElement("img");
//                     userImage.className = "user-image";
//                     userImage.src = data.imageUrl || "default-image-url.jpg"; // Replace with your default image URL
//                     tittlediv.appendChild(userImage);

//                     const twothings = document.createElement("div");
//                     twothings.className = "twotings";
//                     tittlediv.appendChild(twothings);

//                     const username = document.createElement("h2");
//                     username.className = "userdata";
//                     username.innerText = data.tittle;
//                     username.id = `tittle-${doc.id}`;
//                     twothings.appendChild(username);

//                     const timediv = document.createElement("p");
//                     timediv.className = "timediv";

//                     // Calculate the time difference
//                     const messageTimestamp = data.timestamp.toDate();
//                     const currentTime = new Date();
//                     const timeDifference = currentTime - messageTimestamp;

//                     // Calculate minutes ago
//                     const minutesAgo = Math.floor(timeDifference / 60000);

//                     if (minutesAgo < 1) {
//                         timediv.innerText = "Just now";
//                     } else if (minutesAgo === 1) {
//                         timediv.innerText = "1 minute ago";
//                     } else if (minutesAgo < 60) {
//                         timediv.innerText = `${minutesAgo} minutes ago`;
//                     } else if (minutesAgo < 1440) {
//                         const hoursAgo = Math.floor(minutesAgo / 60);
//                         timediv.innerText = `${hoursAgo} hours ago`;
//                     } else {
//                         const daysAgo = Math.floor(minutesAgo / 1440);
//                         timediv.innerText = `${daysAgo} days ago`;
//                     }

//                     twothings.appendChild(timediv);

//                     const blogdiv = document.createElement('div');
//                     blogdiv.className = "blogdiv";
//                     maindiv.appendChild(blogdiv);

//                     const contentblog = document.createElement("p");
//                     contentblog.className = "blog";
//                     contentblog.innerText = data.text;
//                     contentblog.id = `text-${doc.id}`;
//                     blogdiv.appendChild(contentblog);

//                     const fotter = document.createElement("div");
//                     fotter.className = "foot";
//                     blogdiv.appendChild(fotter);

//                     const editButton = document.createElement("button");
//                     editButton.className = "edit";
//                     editButton.innerHTML = "<i class='bi bi-pencil-square'></i>";
//                     fotter.appendChild(editButton);

//                     editButton.addEventListener("click", () => {
//                         editPoll(doc.id);
//                     });

//                     const del1 = document.createElement("button");
//                     del1.innerHTML = "<i class='bi bi-trash'></i>";
//                     del1.addEventListener("click", () => deletePoll(doc.id));
//                     fotter.appendChild(del1);

//                     container.insertBefore(maindiv, container.firstChild);
//                 });
//             }
//         })
//         .catch((error) => {
//             console.error("Error fetching chat:", error);
//         });
// }