// Get the search query from the URL
var searchQuery = new URLSearchParams(window.location.search).get("q");
document.addEventListener("DOMContentLoaded", function() {

document.getElementById("resaul").innerText = searchQuery;

// Now you can use the searchQuery variable to perform actions on the search page
console.log("Search Query:", searchQuery);
// Function to perform the search
    // Get the search query from the input field
  
    // Perform a Firestore query based on the search query
})

function displayPropertyCardss(querySnapshot) {
    // Clear the previous data
    document.getElementsByClassName("property-list").innerHTML ="";
  
    // Iterate through the documents in the query snapshot
      // Access data from each document
      const propertyData = querySnapshot.data();
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
      <button type="button" class="btn btn-primary call-btn"><ion-icon name="call-outline" class="btn-wtsapp"></ion-icon><a href="tel:01111111111111"> Call</a></button>
        <button type="button" class="btn  whatsapp-btn"><ion-icon name="logo-whatsapp" class="btn-wtsapp"></ion-icon> <a href="https://wa.me/1XXXXXXXXXX">Whatsapp</a></button>
    </div>
      </div>
    </div>
      `
      x= document.getElementsByClassName("property-list");
      x[0].appendChild(cardBanner);
  
  }
  
function getSR() {        
    db.collection("units")
    .orderBy("title")
    .startAt(searchQuery)
    .endAt(searchQuery + "\uf8ff")
    .get()
    .then((querySnapshot) => {
      // Handle the search results
      querySnapshot.forEach((doc) => {
        displayPropertyCardss(doc);
    });
})
.catch((error) => {
    console.log("Error searching for units: ", error);
});

    }