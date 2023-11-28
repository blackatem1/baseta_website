const firebaseConfig = {
  apiKey: "AIzaSyBdBgfP6m1z2f-GUGd0w9dc26fhNK1QNvg",
  authDomain: "baseta-60b4d.firebaseapp.com",
  projectId: "baseta-60b4d",
  storageBucket: "baseta-60b4d.appspot.com",
  messagingSenderId: "592412780298",
  appId: "1:592412780298:web:7a3b3aeec1936c92a37cf3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
const auth = firebase.auth();
function get(gets) {
  db.collection(gets).get().then((querySnapshot) => {

    showProgressBar();
    function wait(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
    
    // Example usage:
    async function example() {
      console.log('Start');
      await wait(2000); // Wait for 2000 milliseconds (2 seconds)
      console.log('End after waiting');
    }
    
    example();
    
    displayPropertyCards(querySnapshot)
});}
// function sett() {
//   db.collection("units").set({
//   username: "blackatem",
//   password: "Lovelace",
//   })
//   .then((docRef) => {
//       console.log("Document written with ID: ", docRef.id);
//   })
//   .catch((error) => {
//       console.error("Error adding document: ", error);
//   });
// }

function performSearch() {
  // Get the search query from the input field
  var searchQuery = document.getElementById("searchbar").value;
  // Navigate to the search page with the search query as a query parameter
  window.location.href = "/search/search.html?q=" + encodeURIComponent(searchQuery);
}

function displayPropertyCards(querySnapshot) {
  // Clear the previous data
  document.getElementsByClassName("property-list").innerHTML ="";

  // Iterate through the documents in the query snapshot
  querySnapshot.forEach((doc) => {
    // Access data from each document
    const propertyData = doc.data();
    const cardBanner = document.createElement("li");
    cardBanner.innerHTML = `
    <div class="property-card" >
    <figure class="card-banner">
      <a href="#">
      
        <img src=${propertyData.photos[0]} alt="New Apartment Nice View" class="w-100">
      </a>
      <div class="card-badge ${propertyData.typeofunit === 'rent' ? 'green' : 'blue'}">For ${propertyData.typeofunit}</div>
      <div class="banner-actions">
        <button class="banner-actions-btn">
          <ion-icon name="location"></ion-icon>
          <address>${propertyData.area}</address>
        </button>
        <button class="banner-actions-btn">
          <ion-icon name="camera"></ion-icon>
          <span>${propertyData.photos.length}</span>
        </button>
       
      </div>
    </figure>
    <div class="card-content">
      <div class="card-price">
       <strong>${propertyData.price}</strong>/${propertyData.typeofunit === 'rent' ? 'MONTHLY' : 'TOTAL PRICE'}
      </div>
      <h3 class="h3 card-title">
        <a href="#">${propertyData.title}</a>
      </h3>
      <p class="card-text">
      ${propertyData.description}
      </p>
      <ul class="card-list">
        <li class="card-item">
          <strong>${propertyData.Bedrooms}</strong>
          <ion-icon name="bed-outline"></ion-icon>
          <span>Bedrooms</span>
        </li>
        <li class="card-item">
          <strong>${propertyData.Bathrooms}</strong>
          <ion-icon name="man-outline"></ion-icon>
          <span>Bathrooms</span>
        </li>
        <li class="card-item">
          <strong>${propertyData.Square_ft}</strong>
          <ion-icon name="square-outline"></ion-icon>
          <span>Square Ft</span>
        </li>
      </ul>
    </div>
    <div class="card-footer">
    <button type="button" class="btn btn-primary call-btn"><ion-icon name="call-outline" class="btn-wtsapp"></ion-icon><a href="tel:01111111111111"style="font-size: 16px; font-weight: bold; color: white;"> Call</a></button>
    <button type="button" class="btn whatsapp-btn" style="font-size: 16px; font-weight: bold;">
    <ion-icon name="logo-whatsapp" class="btn-wtsapp"></ion-icon> 
    <a href="https://wa.me/1XXXXXXXXXX" style="font-size: 15px; font-weight: bold; color: white;">WhatsApp</a>
  </button>
    </div>
    </div>
  </div>
    `
    x= document.getElementsByClassName("property-list");
    x[0].appendChild(cardBanner);
    hideProgressBar();

  });
}


var progressContainer = document.getElementById('progress-container');
var progressBar = document.getElementById('progress-bar');

// Show the progress bar
function showProgressBar() {
  console.log("showed");
  if (progressContainer && progressContainer.style) {
    progressContainer.style.display = 'flex';
  }
}

// Hide the progress bar
function hideProgressBar() {
  console.log("hide");

  if (progressContainer && progressContainer.style) {
    progressContainer.style.display = 'none';
  }
}
