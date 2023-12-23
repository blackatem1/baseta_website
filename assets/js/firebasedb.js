const firebaseConfig = {
  apiKey: "AIzaSyBdBgfP6m1z2f-GUGd0w9dc26fhNK1QNvg",
  authDomain: "baseta-60b4d.firebaseapp.com",
  projectId: "baseta-60b4d",
  storageBucket: "baseta-60b4d.appspot.com",
  messagingSenderId: "592412780298",
  appId: "1:592412780298:web:7a3b3aeec1936c92a37cf3"
};
function showProgressBar() {
  document.getElementById('progress-container').style.display = 'flex';
}
  
  // Hide the progress bar
function hideProressBar() {
  document.getElementById('progress-container').style.display = 'none';
}



firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
const auth = firebase.auth();
const analytics = firebase.analytics();
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // you can now add any event you like by just typing this code do it by your self
      // firebase.analytics().logEvent('event_name', { param1: 'value1', param2: 'value2' });
      // firebase.analytics().logEvent('notification_received');
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function get(gets) {
  showProgressBar();
  db.collection(gets).get().then((querySnapshot) => {    
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


document.body.addEventListener("click", function (evt) {
  console.dir(this);
  //note evt.target can be a nested element, not the body element, resulting in misfires
  console.log(evt.target);
  alert("body clicked");
}); 

function deleteContents() {
  document.getElementById("searchbar").value="";
}

function searchchnaged() {
  var lociconDiv = document.querySelector('.locicon');
  
  document.getElementById('suffix').style.display="flex";
  var type_unit = document.getElementById("type-unit").value;
  val=document.getElementById("searchbar").value;
  var val2 = document.querySelector('input[name="type-btn"]:checked').value;
  db.collection("units").get().then((querySnapshot) => {    
    document.getElementById("suggestion-ul").innerHTML="";
    document.querySelector('.locicon').innerHTML="";
    let currentIndex = 0;
    
    querySnapshot.forEach((doc) => {
      const propertyData = doc.data();
      if (currentIndex <= 5) {
        if (type_unit == propertyData.title || type_unit ==0) {
          if (propertyData.area.toLowerCase().includes(val.toLowerCase())) {
            if (propertyData.typeofunit==val2) {
              var sugg_li = document.createElement("li");
                var liElement = document.createElement('li');
                var ionIcon = document.createElement('ion-icon');
                ionIcon.setAttribute('name', 'location-outline');
                ionIcon.setAttribute('class', 'li');
                sugg_li.setAttribute('class', 'li');
                sugg_li.onclick=function sssss() {
                  document.getElementById("searchbar").value = sugg_li.innerText ;
                  searchchnaged();
                }
                sugg_li.innerText = propertyData.area;
                liElement.appendChild(ionIcon);
                lociconDiv.appendChild(liElement);
                document.getElementById("suggestion-ul").appendChild(sugg_li);
            }
          }
      }
      }
      
      currentIndex++;
    });
    if (currentIndex != 0) {
      document.getElementById("suggestions").style.display="flex";
      
    }
});
}



function performSearch() {
  event.preventDefault();
  // Get the search query from the input field
  var searchQuery = document.getElementById("searchbar").value;
  var second_price = document.getElementById("second-price").value;
  var first_price = document.getElementById("first-price").value;
  
  // Get the selected value from the radio button with the name "type-btn"
  var type_btn = document.querySelector('input[name="type-btn"]:checked').value;
  
  var type_unit = document.getElementById("type-unit").value;
  
  // Navigate to the search page with the search query and other parameters
  window.location.href = "./search/search.html?search=" + encodeURIComponent(searchQuery) +
      "&second_price=" + encodeURIComponent(second_price) +
      "&first_price=" + encodeURIComponent(first_price) +
      "&type_btn=" + encodeURIComponent(type_btn) +
      "&unit=" + encodeURIComponent(type_unit);
  
}
function CardGO(id) {
  window.location.href = "./product/product.html?Product_ID=" + encodeURIComponent(id); 
}
function displayPropertyCards(querySnapshot) {
  // Clear the previous data
  document.getElementsByClassName("property-list").innerHTML ="";
  let c=0;
  // Iterate through the documents in the query snapshot
  querySnapshot.forEach((doc) => {
    // Access data from each document
    c++;

    const propertyData = doc.data();
    const cardBanner = document.createElement("li");
    cardBanner.innerHTML = `
    <div class="property-card" >
    <figure class="card-banner h-100">
      <div id="carouselExampleControls-${c}" class="carousel h-100 slide" data-bs-ride="carousel">
      <div class="carousel-inner h-100">

      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls-${c}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls-${c}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
        
      
      <div onclick="CardGO('${doc.id}')" class="card-badge ${propertyData.typeofunit === 'rent' ? 'green' : 'blue'}">For ${propertyData.typeofunit}</div>
      <div class="banner-actions"onclick="CardGO('${doc.id}')">
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
    <div class="card-content" onclick="CardGO('${doc.id}')" >
      <div class="card-price">
       <strong>${propertyData.price}</strong>/${propertyData.typeofunit === 'rent' ? 'MONTHLY' : 'TOTAL PRICE'}
      </div>
      <h3 class="h3 card-title">
        <a >${propertyData.title}</a>
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
    <button type="button" class="butn  call-btn"><ion-icon name="call-outline" class="btn-wtsapp"></ion-icon><a href="tel:01111111111111"style="font-size: 16px; font-weight: bold; color: white;"> Call</a></button>
    <button type="button" class="butn whatsapp-btn" style="font-size: 16px; font-weight: bold;">
    <ion-icon name="logo-whatsapp" class="btn-wtsapp"></ion-icon> 
    <a href="https://wa.me/1XXXXXXXXXX" style="font-size: 15px; font-weight: bold; color: white;">WhatsApp</a>
  </button>
    </div>
    </div>
  </div>
    `
      // Your code here
      let osa = cardBanner.querySelector(".carousel-inner");
      
      propertyData.photos.forEach((element, index) => {
        diva = document.createElement("div");
        if (index == 0) {
          diva.className = "carousel-item active h-100";
        }else{
          diva.className = "carousel-item  h-100";
        }
  
        img = document.createElement("img");
        img.className = "d-block w-100 h-100";
        img.src = element;
  
        diva.appendChild(img);
        osa.appendChild(diva);
    });
    x= document.getElementsByClassName("property-list");
    x[0].appendChild(cardBanner);
    hideProressBar();

  });
}


