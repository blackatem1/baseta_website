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
  function get(gets) {
  showProgressBar();
  db.collection(gets).get().then((querySnapshot) => {    
    displayPropertyCards(querySnapshot)
});}


function deleteContents() {
  document.getElementById("searchbar").value="";
  document.getElementById('deleteconts').style.display="none";
  
}

function searchchnaged() {
  document.getElementById('deleteconts').style.display="flex";

  var lociconDiv = document.querySelector('.locicon');
  
  document.getElementById('suffix').style.display="flex";
  if (document.querySelector('input[name="type-btn"]:checked').value == "rent") {
    var type_unit = document.getElementById("type-unit1").value;
  }
  if (document.querySelector('input[name="type-btn"]:checked').value == "sale") {
    var type_unit = document.getElementById("type-unit2").value;
  }  
  val2=document.getElementById("searchbar").value;
  val3 = document.querySelector('input[name="type-btn"]:checked').value;
  db.collection("units").get().then((querySnapshot) => {    
    document.getElementById("suggestion-ul").innerHTML="";
    document.querySelector('.locicon').innerHTML="";
    let currentIndex = 0;
    
    querySnapshot.forEach((doc) => {
      const propertyData = doc.data();
      if (currentIndex <= 5) {
        if (type_unit == propertyData.title || type_unit ==0) {
          console.log(propertyData.area_ar,val2 ,type_unit)
          if (propertyData.area_ar.includes(val2)) {
            if (propertyData.typeofunit==val3) {
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
                sugg_li.innerText = propertyData.area_ar;
                lociconDiv.appendChild(liElement);
                liElement.appendChild(ionIcon);
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
function getArabicTranslation(englishText) {
  switch (englishText) {
    case 'Apartment':
      return 'شقة';
    case 'Villa':
      return 'فيلا';
    case 'Townhouse':
      return 'تاون هاوس';
    case 'penthouse':
      return 'بنتهاوس';
    case 'Compound':
      return 'كمبوند';
    case 'chalet':
      return 'شاليه';
    case 'Twin House':
      return 'توين هاوس';
    case 'Duplex':
      return 'دوبلكس';
    case 'Full Floor':
      return 'الطابق الكامل';
    case 'Half Floor':
      return 'الطابق النصف';
    case 'Whole Building':
      return 'المبنى بأكمله';
    case 'Land':
      return 'أرض';
    case 'Bulk Sale Unit':
      return 'وحدة البيع بالجملة';
    case 'Bungalow':
      return 'بنغلو';
    case 'iVilla':
      return 'أي فيلا';
    default:
      return englishText;
  }
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
    propertyData.title = getArabicTranslation(propertyData.title);
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
        
      
      <div onclick="CardGO('${doc.id}')" class="card-badge cursor ${propertyData.typeofunit === 'rent' ? 'green' : 'blue'}">${propertyData.typeofunit === 'rent' ? 'للايجار' : 'للبيع'}</div>
      <div class="banner-actions"onclick="CardGO('${doc.id}')">
        <button class="banner-actions-btn">
          <ion-icon name="location"></ion-icon>
          <address>${propertyData.area_ar}</address>
        </button>
        <button class="banner-actions-btn">
          <ion-icon name="camera"></ion-icon>
          <span>${propertyData.photos.length}</span>
        </button>
       
      </div>
    </figure>
    <div class="card-content cursor" onclick="CardGO('${doc.id}')" >
      <div class="card-price">
      ${propertyData.typeofunit === 'rent' ? 'في الشهر' : 'السعر الكلي'}/<strong>${propertyData.price}</strong>
      </div>
      <h3 class="h3 card-title">
        <a >${propertyData.title}</a>
      </h3>
      <p class="card-text">
      ${propertyData.desc_ar}
      </p>
      <ul class="card-list">
        <li class="card-item">
          <strong>${propertyData.Bedrooms}</strong>
          <ion-icon name="bed-outline"></ion-icon>
          <span>غرف النوم</span>
        </li>
        <li class="card-item">
          <strong>${propertyData.Bathrooms}</strong>
          <ion-icon name="man-outline"></ion-icon>
          <span>الحمامات</span>
        </li>
        <li class="card-item">
          <strong>${propertyData.Square_ft}</strong>
          <ion-icon name="square-outline"></ion-icon>
          <span>قدم مربع</span>
        </li>
      </ul>
    </div>
    <div class="card-footer ">
    <a href="tel:01090009000"class="butn  call-btn"> 
    <button type="button" class="call-btn"style="font-size: 16px; font-weight: bold; color: white;">
    اتصال 
    <ion-icon name="call-outline" class="btn-wtsapp"></ion-icon>
    </button>
    </a>
    <button type="button" class="butn whatsapp-btn" style="font-size: 16px; font-weight: bold;">
    <a href="https://wa.me/01090009000" style="font-size: 15px; font-weight: bold; color: white;">واتساب</a>
    <ion-icon name="logo-whatsapp" class="btn-wtsapp"></ion-icon> 
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


function selectsch() {
  if (document.querySelector('input[name="type-btn"]:checked').value == "rent") {
  document.getElementById('selectsrent').style.display="flex";
  document.getElementById('selectsbuy').style.display="none";
}if(document.querySelector('input[name="type-btn"]:checked').value == "sale"){
  document.getElementById('selectsbuy').style.display="flex";
  document.getElementById('selectsrent').style.display="none";
  }
  
}