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
const analytics = firebase.analytics();
// firebase.analytics().logEvent('Login',{1:'blackatem',2:"hhhhhhhhhhhhhhhhhhhhhhhhhh"});
// firebase.analytics().logEvent('first_visit');
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // you can now add any event you like by just typing this code do it by your self
      // firebase.analytics().logEvent('event_name', { ID: 'value1', Area: 'value2' ,Title: 'value2' });
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
}).catch((error) => {
  console.error("Error deleting document:", error);
  hideProressBar();
});}


function deleteContents() {
  document.getElementById("searchbar").value="";
  document.getElementById('deleteconts').style.display="none";
  
}

function searchchnaged() {
  let currentIndex = 0;
  document.getElementById('deleteconts').style.display="flex";

  var lociconDiv = document.querySelector('.locicon');
  
  document.getElementById('suffix').style.display="flex";
  if (document.querySelector('input[name="type-btn"]:checked').value == "rent") {
    var type_unit = document.getElementById("type-unit1").value;
  }
  if (document.querySelector('input[name="type-btn"]:checked').value == "sale") {
    var type_unit = document.getElementById("type-unit2").value;
  }  val=document.getElementById("searchbar").value;
  var val2 = document.querySelector('input[name="type-btn"]:checked').value;
  db.collection("units").get().then((querySnapshot) => {    
    document.getElementById("suggestion-ul").innerHTML="";
    document.querySelector('.locicon').innerHTML="";
    
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
                  document.getElementById('suggestion').style.display="none";

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
    if (document.getElementById("suggestion-ul").innerHTML=="") {
      var sugg_li = document.createElement("li");
      var liElement = document.createElement('li');
      sugg_li.innerText = "We can't find your search query. Please check your vocabulary or try a different site";
      lociconDiv.appendChild(liElement);
      document.getElementById("suggestion-ul").appendChild(sugg_li);
    }  
    if (currentIndex != 0) {
      document.getElementById("suggestions").style.display="flex";
    }  
});
}

function CardGO(id,area,title) {
  analytics.logEvent('watched', { ID: id, Area: area ,Title:title });
    window.location.href = "./product/product.html?Product_ID=" + encodeURIComponent(id); 
}
// Example: Log a custom event named 'purchase' with parameters
// logCustomEventWithParams('purchase', purchaseParams);


function performSearch() {
  event.preventDefault();
  var searchbarValue = document.getElementById('searchbar').value;
  var typeUnit1Value = document.getElementById('type-unit1').value;
  var firstPrice1Value = document.getElementById('first-price1').value;

  var typeUnit2Value = document.getElementById('type-unit2').value;
  var firstPrice2Value = document.getElementById('first-price2').value;


  // Get the search query from the input field
  var searchQuery = document.getElementById("searchbar").value;
  if (document.querySelector('input[name="type-btn"]:checked').value == "rent") {
    var second_price = document.getElementById("second-price1").value;
    var type_unit = document.getElementById("type-unit1").value;
    var first_price = document.getElementById("first-price1").value;
    if (!searchbarValue && typeUnit1Value === '0' && firstPrice1Value === '0') {
      alert('Please enter at least one value before submitting the form.');
      return;
    }
  }
  if (document.querySelector('input[name="type-btn"]:checked').value == "sale") {
    var second_price = document.getElementById("second-price2").value;
    var type_unit = document.getElementById("type-unit2").value;
    var first_price = document.getElementById("first-price2").value;
    if (!searchbarValue && typeUnit2Value === '0' && firstPrice2Value === '0') {
      alert('Please enter at least one value before submitting the form.');

      return;
    }
  }

  // Get the search query from the input field
  var searchQuery = document.getElementById("searchbar").value;
  if (document.querySelector('input[name="type-btn"]:checked').value == "rent") {
    var second_price = document.getElementById("second-price1").value;
    var type_unit = document.getElementById("type-unit1").value;
    var first_price = document.getElementById("first-price1").value;
  }
  if (document.querySelector('input[name="type-btn"]:checked').value == "sale") {
    var second_price = document.getElementById("second-price2").value;
    var type_unit = document.getElementById("type-unit2").value;
    var first_price = document.getElementById("first-price2").value;
  }
  
  // Get the selected value from the radio button with the name "type-btn"
  var type_btn = document.querySelector('input[name="type-btn"]:checked').value;
  
  
  // Navigate to the search page with the search query and other parameters
  window.location.href = "./search/search.html?search=" + encodeURIComponent(searchQuery) +
      "&second_price=" + encodeURIComponent(second_price) +
      "&first_price=" + encodeURIComponent(first_price) +
      "&type_btn=" + encodeURIComponent(type_btn) +
      "&unit=" + encodeURIComponent(type_unit);
  

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
    price = propertyData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
        
      
      <div onclick="CardGO('${doc.id}','${propertyData.title}','${propertyData.area}')" class="card-badge cursor ${propertyData.typeofunit === 'rent' ? 'green' : 'blue'}">For ${propertyData.typeofunit}</div>
      <div class="banner-actions"onclick="CardGO('${doc.id}','${propertyData.title}','${propertyData.area}')">
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
    <div class="card-content cursor" onclick="CardGO('${doc.id}','${propertyData.title}','${propertyData.area}')" >
      <div class="card-price">
       <strong>${price}</strong> 
       <strong>L.E</strong> 
       <div><p> /${propertyData.typeofunit === 'rent' ? 'MONTHLY' : 'TOTAL PRICE'}</p></div>
      </div>
      <h3 class="h3 card-title">
        <a >${propertyData.title}</a>
      </h3>
      <p class="card-text" style="   overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
              line-clamp: 2; 
      -webkit-box-orient: vertical;">
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
    <div class="card-footer ">
    <a href="tel:01090009000"class="butn  call-btn wb-a"> 
    <button type="button" class="call-btn"style="font-size: 16px; font-weight: bold; color: white;"><ion-icon name="call-outline" class="btn-wtsapp"></ion-icon>Call</button>
    </a>
    <a href="tel:01090009000"class="butn  whatsapp-btn wb-a"> 
    <button type="button" class="whatsapp-btn"style="font-size: 16px; font-weight: bold; color: white;"><ion-icon name="logo-whatsapp" class="btn-wtsapp"></ion-icon>whatsapp</button>
    </a>

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


function selectsch() {
  if (document.querySelector('input[name="type-btn"]:checked').value == "rent") {
  document.getElementById('selectsrent').style.display="flex";
  document.getElementById('selectsbuy').style.display="none";
}if(document.querySelector('input[name="type-btn"]:checked').value == "sale"){
  document.getElementById('selectsbuy').style.display="flex";
  document.getElementById('selectsrent').style.display="none";
  }
  
}