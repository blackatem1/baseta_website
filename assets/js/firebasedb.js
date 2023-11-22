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
const db = firebase.firestore();
// const auth = firebase.auth();
function get(gets) {
  db.collection(gets).get().then((querySnapshot) => {
    displayPropertyCards(querySnapshot)
});}

function sett() {
  db.collection("employee").set({
  username: "blackatem",
  password: "Lovelace",
  })
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
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
    <div class="property-card">
    <figure class="card-banner">
      <a href="#">
        <img src="./assets/images/property-1.jpg" alt="New Apartment Nice View" class="w-100">
      </a>
      <div class="card-badge ${propertyData.typeofunit === 'rent' ? 'green' : 'blue'}">For ${propertyData.typeofunit}</div>
      <div class="banner-actions">
        <button class="banner-actions-btn">
          <ion-icon name="location"></ion-icon>
          <address>${propertyData.area}</address>
        </button>
        <button class="banner-actions-btn">
          <ion-icon name="camera"></ion-icon>
          <span>4</span>
        </button>
        <button class="banner-actions-btn">
          <ion-icon name="film"></ion-icon>
          <span>2</span>
        </button>
      </div>
    </figure>
    <div class="card-content">
      <div class="card-price">
       <strong>${propertyData.price}</strong>/${propertyData.typeofunit === 'rent' ? 'Month' : 'total price'}
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
    <button type="button" class="btn btn-primary call-btn"><ion-icon name="call-outline" class="btn-wtsapp"></ion-icon>  Call</button>
      <button type="button" class="btn  whatsapp-btn"><ion-icon name="logo-whatsapp" class="btn-wtsapp"></ion-icon> Whatsapp</button>
  </div>
    </div>
  </div>
    `
    x= document.getElementsByClassName("property-list");
    x[0].appendChild(cardBanner);

  });
}
