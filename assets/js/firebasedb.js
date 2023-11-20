  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  import { getFirestore ,collection } from "firebase/firestore"; // Import Firestore module

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBdBgfP6m1z2f-GUGd0w9dc26fhNK1QNvg",
    authDomain: "baseta-60b4d.firebaseapp.com",
    projectId: "baseta-60b4d",
    storageBucket: "baseta-60b4d.appspot.com",
    messagingSenderId: "592412780298",
    appId: "1:592412780298:web:7a3b3aeec1936c92a37cf3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Get a Firestore instance
  const db = getFirestore(app);
  function setDataToFirestore() {
    const dataToSet = {
      message: "Hello, Firestore!",
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      // Add more fields as needed
    };

    // Add data to Firestore
    db.collection("your_collection_name").add(dataToSet)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  // Attach event listener to the button
  document.getElementById("setDataButton").addEventListener("click", setDataToFirestore);
 
