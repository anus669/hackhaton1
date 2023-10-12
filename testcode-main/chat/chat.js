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
  const auth = firebase.auth();
  const storage = firebase.storage();

 const timestamp = firebase.firestore.FieldValue.serverTimestamp();
 let button = document.getElementById("button");
button.addEventListener("click", function() {
    // Get the values of the title and text fields
    const tittle = document.getElementById("tittle").value;
    const text = document.getElementById("input").value;
    // const imge = document.getElementById("imageinput").file0
   // Get the current user's ID
   const userId = auth.currentUser ? auth.currentUser.uid : null;

   if (!userId) {
     alert("Please log in to add a post.");
     return;
   }
    // Add the new message to the database
    db.collection("muzammil")
      .add({
        timestamp: timestamp,
        tittle: tittle,
        text: text,
        userId: userId 
       
      })
      .then(() => {
        console.log("Message added successfully");
        rendermsg(); // Refresh the messages
      })
      .catch((error) => {
        console.error("Error adding message:", error);
      });
  
    // Clear input fields
    document.getElementById("tittle").value = "";
    document.getElementById("input").value = "";
});
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
         const reversedDocs = querySnapshot.docs.reverse();

         reversedDocs.forEach((doc) => {
           const data = doc.data();
//iske ander sab he
           const maindiv = document.createElement("div");
           maindiv.className = "datamain"
           container.appendChild(maindiv)
//isme pic or tittel niche nam
           const tittlediv = document.createElement("div")
           tittlediv.className = "tittlediv"
           maindiv.appendChild(tittlediv);
//image ka div
const imagediv = document.createElement("div");
imagediv.className = "imagediv";
tittlediv.appendChild(imagediv);

// Create an icon (avatar) element
const imagee = document.createElement("i");
imagee.className = "bi bi-person-circle";
imagee.id = "iid";
imagediv.appendChild(imagee);

//tittele div me ab name
const twothings = document.createElement("div")
twothings.className ="twotings"
tittlediv.appendChild(twothings)


const username= document.createElement("h2")
username.className = "userdata"
username.innerText= data.tittle
username.id = `tittle-${doc.id}`;
twothings.appendChild(username)

const timediv = document.createElement("p");
timediv.className = "timediv";

// Calculate the time difference
const messageTimestamp = data.timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date object
const currentTime = new Date();
const timeDifference = currentTime - messageTimestamp;

// Calculate minutes ago
const minutesAgo = Math.floor(timeDifference / 60000); // 1 minute = 60000 milliseconds

// Display the time in the appropriate format
if (minutesAgo < 1) {
  timediv.innerText = "Just now";
} else if (minutesAgo === 1) {
  timediv.innerText = "1 minute ago";
} else if (minutesAgo < 60) {
  timediv.innerText = `${minutesAgo} minutes ago`;
} else if (minutesAgo < 1440) { // 1440 minutes in a day (24 hours)
  const hoursAgo = Math.floor(minutesAgo / 60);
  timediv.innerText = `${hoursAgo} hours ago`;
} else {
  const daysAgo = Math.floor(minutesAgo / 1440);
  timediv.innerText = `${daysAgo} days ago`;
}

// Append the timestamp to the main div
twothings.appendChild(timediv);



// AB MUJHA BLOG KI DIV BANANI HE 

blogdiv = document.createElement('div')
blogdiv.className = "blogdiv"
// blogdiv.innerText = data.text
maindiv.appendChild(blogdiv)

contentblog = document.createElement("p")
contentblog.className ="blog"
contentblog.innerText = data.text
contentblog.id = `text-${doc.id}`
blogdiv.appendChild(contentblog)


fotter = document.createElement("div")
fotter.className ="foot"
blogdiv.appendChild(fotter)


const editButton = document.createElement("button");
// editButton.className = "btn btn-warning btn-sm button";
editButton.className ="edit"
editButton.innerHTML = "<i class='bi bi-pencil-square'></i>";
fotter.appendChild(editButton);

// Attach the editPoll function to the "Edit" button
editButton.addEventListener("click", () => {
  editPoll(doc.id);
});
const del1 = document.createElement("button");
del1.innerHTML = "<i class='bi bi-trash'></i>";
del1.addEventListener("click", () => deletePoll(doc.id));
fotter.appendChild(del1);




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
function editPoll(docId) {
    const currentUser = auth.currentUser; // Get the current user
  
    if (!currentUser) {
      alert("Please log in to edit this post.");
      return;
    }
  
    // Get the existing title and text elements by their unique IDs
    const existingTittleElement = document.getElementById(`tittle-${docId}`);
    const existingTextElement = document.getElementById(`text-${docId}`);
  
    // Get the current title and text values
    const currentTittle = existingTittleElement.innerText;
    const currentText = existingTextElement.innerText;
  
    // Prompt the user to edit the title and text
    const updatedTittle = prompt("Edit the title:", currentTittle);
    const updatedText = prompt("Edit the text:", currentText);
  
    if (updatedTittle === null || updatedText === null) {
      // User canceled the update
      return;
    }
  
    // Update the title and text elements with the edited values
    existingTittleElement.innerText = updatedTittle;
    existingTextElement.innerText = updatedText;
  
    // Update the document in the Firestore database if the current user is the author
    const postUserId = existingTittleElement.getAttribute("data-userid"); // Get the userId from the data attribute
  
    if (currentUser.uid === postUserId) {
      db.collection("muzammil")
        .doc(docId)
        .update({
          tittle: updatedTittle,
          text: updatedText,
        })
        .then(() => {
          console.log("Document updated with ID:", docId);
        })
        .catch((error) => {
          console.error("Error updating post:", error);
        });
    } else {
      alert("You are not authorized to edit this post.");
    }
  }
  
document.addEventListener("DOMContentLoaded", function () {
  rendermsg();
 });

 


 function editPoll(docId) {
    const currentUser = auth.currentUser; // Get the current user
  
    if (!currentUser) {
      alert("Please log in to edit this post.");
      return;
    }
  
    // Get the existing title and text elements by their unique IDs
    const existingTittleElement = document.getElementById(`tittle-${docId}`);
    const existingTextElement = document.getElementById(`text-${docId}`);
  
    // Get the current title and text values
    const currentTittle = existingTittleElement.innerText;
    const currentText = existingTextElement.innerText;
  
    // Prompt the user to edit the title and text
    const updatedTittle = prompt("Edit the title:", currentTittle);
    const updatedText = prompt("Edit the text:", currentText);
  
    if (updatedTittle === null || updatedText === null) {
      // User canceled the update
      return;
    }
  
    // Update the title and text elements with the edited values
    existingTittleElement.innerText = updatedTittle;
    existingTextElement.innerText = updatedText;
  
    // Update the document in the Firestore database
    db.collection("muzammil")
      .doc(docId)
      .update({
        tittle: updatedTittle,
        text: updatedText,
      })
      .then(() => {
        console.log("Document updated with ID:", docId);
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  }
  

document.addEventListener("DOMContentLoaded", function () {
  rendermsg();
});

function deletePoll(docId) {
    // Check if the user is logged in
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      alert("Please log in to delete this post.");
      return;
    }
  
    // Get the post document using the provided docId
    db.collection("muzammil")
      .doc(docId)
      .get()
      .then((doc) => {
        // Check if the document exists
        if (doc.exists) {
          // Get the data from the post document
          const data = doc.data();
  
          // Check if the current user is the author of the post or has the necessary permissions
          if (currentUser.uid === data.userId) {
            // If the current user is authorized, delete the post
            db.collection("muzammil")
              .doc(docId)
              .delete()
              .then(() => {
                console.log("Document deleted with ID:", docId);
                rendermsg(); // Refresh the posts to update the UI
              })
              .catch((error) => {
                console.error("Error deleting post:", error);
              });
          } else {
            // If the current user is not authorized, show an alert
            alert("You are not authorized to delete this post.");
          }
        } else {
          // Document doesn't exist, handle the error or show a message
          console.error("Document not found:", docId);
        }
      })
      .catch((error) => {
        console.error("Error fetching document from Firestore: ", error);
      });
  }
  


document.addEventListener("DOMContentLoaded", function () {
    rendermsg();
 });





let signout = document.getElementById("signout");
signout.addEventListener("click", function () {
  const user = firebase.auth().currentUser;

  if (user) {
    // User is logged in, proceed with sign-out and data deletion
    firebase.auth().signOut()
      .then(function () {
        // Sign-out successful.
        console.log("User signed out successfully.");

        // Delete user data from the Realtime Database
        const userId = user.uid;
        const databaseRef = firebase.database().ref('users/' + userId);
        databaseRef.remove()
          .then(() => {
            console.log("User data deleted from the database.");
            window.location.href = "../login/index.html";
          })
          .catch((error) => {
            console.error("Error deleting user data: ", error);
          });

        // You can add any additional actions you want to perform after signing out here.
      })
      .catch(function (error) {
        // An error happened.
        console.error("Sign-out error: ", error);
      });
  } else {
    // No user is logged in, you can redirect or show a message
    console.log("No user is logged in.");
    window.location.href = "../login/index.html"; // Redirect to login page
  }
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