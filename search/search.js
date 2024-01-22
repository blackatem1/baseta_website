// Get the search query from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var searchQuery = urlParams.get('search');
var secondPrice = urlParams.get('second_price');
var firstPrice = urlParams.get('first_price');
var typeBtn = urlParams.get('type_btn');
var unit = urlParams.get('unit');
window.onpopstate = function(event) {
  location.reload();
}

searchQuery=searchQuery.toLowerCase();
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("resaul").innerText = searchQuery;
  document.getElementById("slaeorbuy").innerText = typeBtn;
  // Now you can use the searchQuery variable to perform actions on the search page
  // console.log("Search Query:", searchQuery);
})

function getSR() {    
  
  showProgressBar();
  let cardNumber = 0; 
  
  const collectionRef = db.collection("units");

  collectionRef.get()
    .then(
      querySnapshot => {
        querySnapshot.forEach(doc => {
        const data = doc.data();
        // Perform client-side filtering
        data.area =data.area.toLowerCase();
        if (data.area.includes(searchQuery)) {
          if (secondPrice != ">") {
            secondPrice=parseInt(secondPrice);
          }
          if (firstPrice != ">") {
            firstPrice=parseInt(firstPrice);
          }
          data.price=parseInt(data.price);
          if (data.typeofunit==typeBtn) {
            if (firstPrice ==">" && data.price>=100000 || firstPrice==0|| data.price>=firstPrice ) {
              if (secondPrice==">" && data.price>=100000 ||secondPrice==0|| data.price<=secondPrice) {
                if (data.title==unit || unit==0) {
                  displayPropertyCardss(data,doc.id);
                  cardNumber++;

          }
        }
      }
    }
        }
      });
  document.getElementById("counts").innerText = cardNumber;
  if (cardNumber == 0) {
    console.log("sdd");
    const NotfoundT = document.createElement("li");
    NotfoundT.innerText= "not data";
    NotfoundT.className= "notfound";
    x= document.getElementsByClassName("sreasults");
    x[0].appendChild(NotfoundT);
  }
  hideProressBar();

    

    }
    )
    .catch(error => {
      console.error("Error getting documents: ", error);
      hideProressBar();
    });

    }
    function change_page(){
      window.location.href = "../login/login.html";
    } 
function share_search(id) {
  let copyText =window.location.origin+"/BASETA_WEBSITE/product/product.html?Product_ID=" + encodeURIComponent(id);
  analytics.logEvent('shared', {share_link:window.location.href })
  navigator.clipboard.writeText(copyText);
  document.getElementById("shareButton_"+id).innerText="copied to clipboard";
}
function myFunction_wa(id) {
  let copyText =window.location.origin+"/BASETA_WEBSITE/ar/product/product.html?Product_ID=" + encodeURIComponent(id);
  newtext= "whatsapp://send?text="+copyText;
  analytics.logEvent('shared', {share_link:window.location.href })
  window. open(newtext, '_blank');
}
function CardGOF(id) {
  window.location.href = "../product/product.html?Product_ID=" + encodeURIComponent(id); 
}
function displayPropertyCardss(querySnapshot,id) {
    // Clear the previous data
  
    // Iterate through the documents in the query snapshot
      // Access data from each document
      const propertyData = querySnapshot;
    price = propertyData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      const cardBanner = document.createElement("li");
    cardBanner.innerHTML=`
     <section class="search-result-item p-3">

    <div class="search-result-item-body">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-5 ">
            <div id="carouselExample-${id}" class="carousel slide img-ser-caro">
            <div class="carousel-inner h-100 carousel-inner-${id}">
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample-${id}" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample-${id}" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-7  prop-card"  >
          
          <div class="card-baddge  ${propertyData.typeofunit === 'rent' ? 'green' : 'blue'}">For ${propertyData.typeofunit}</div>
          <div class="titles-sea">
          <ion-icon name="home" class="home_100"></ion-icon> 
          <h4 class="search-result-item-heading">${propertyData.title}</h4>
          </div>
          
            <div class="inf-are">
            <ion-icon name="location-outline"></ion-icon>
                    <p class="info inf-are"> ${propertyData.area}</p>
            </div>       
            <p class="description" style="">${propertyData.description}</p>
                <p class="value3 mt-sm"><strong> ${price}</strong> L.E \\ ${propertyData.typeofunit === 'rent' ? 'MONTHLY' : 'TOTAL PRICE'}</p>
              <ul class="card-list cl-sea">
              <li class="card-item ci-sea">
                <strong>${propertyData.Bedrooms}</strong>
                <ion-icon name="bed-outline"></ion-icon>
                <span>Bedrooms</span>
              </li>
              <li class="card-item ci-sea">
                <strong>${propertyData.Bathrooms}</strong>
                <ion-icon name="man-outline"></ion-icon>
                <span>Bathrooms</span>
              </li>
              <li class="card-item ci-sea">
                <strong>${propertyData.Square_ft}</strong>
                <ion-icon name="square-outline"></ion-icon>
                <span>Square Ft</span>
              </li>
            </ul>
            <div class="card-footer" style="justify-content:normal;flex-direction:column">
            <div class="buttons">
            <a href="tel:01090009000"class="   call-btn wb-a"> 
              <button type="button" class="butn call-btn"style="font-size: 16px; font-weight: bold; color: white;"><ion-icon name="call-outline" class="btn-wtsapp"></ion-icon>Call</button>
            </a>
            <a href="https://wa.me/01090009000"class="  whatsapp-btn wb-a"> 
              <button type="button" class="butn whatsapp-btn"style="font-size: 16px; font-weight: bold; color: white;"><ion-icon name="logo-whatsapp" class="btn-wtsapp"></ion-icon>whatsapp</button>
            </a>
          </div>
          <div class="buttons w-100">
            <a class="upper-share-btn butn wb-a"> 
              <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal_${id}" class=" share-btn"style="font-size: 16px; font-weight: bold; color: white;"><ion-icon name="share-social-outline"class="btn-wtsapp"></ion-icon>Share</button>
            </a>
          </div>
            </div>
 
            </div>
        </div>
    </div>
</section>

<div class="modal fade" id="exampleModal_${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"style="  z-index: 99999999999 !important;">
<div class="modal-dialog modal-dialog-centered"style="z-index: 9999999 !important;">
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">Share</h1>
    </div>
    <div class="modal-body" style="">
      <div class="buttons"style="justify-content: space-around;">
        <a class="   call-btn wb-a"style="backgroung"onclick="share_search('${id}')"> 
          <button type="button" id="shareButton_${id}" class="butn call-btn"style="font-size: 16px; font-weight: bold; color: white;"><ion-icon name="copy"class="btn-wtsapp"></ion-icon>Copy</button>
        </a>
        <a onclick="myFunction_wa('${id}')" class="  whatsapp-btn wb-a" target="_blank" data-bs-dismiss="modal" aria-label="Close" > 
          <button type="button" class="butn whatsapp-btn"style="font-size: 16px; font-weight: bold; color: white;"><ion-icon name="logo-whatsapp" class="btn-wtsapp"></ion-icon>share whatsapp</button>
        </a>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="butn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  </div>
</div>
</div>


`;
    x= document.getElementsByClassName("sreasults");
    x[0].appendChild(cardBanner);
    osa=document.getElementsByClassName("carousel-inner-"+id);

    // osa.innerHTML ="";

    // Iterate through the documents in the query snapshot
    // Access data from each document
    propertyData.photos.forEach((element, index) => {
      // alert(index);
        diva = document.createElement("div");
        if (index == 0) {
          diva.className = "carousel-item active h-100";
        }else{
          diva.className = "carousel-item h-100";
        }
        
        img = document.createElement("img");
        img.className = "d-block img-sear-caro ";
        img.src = element;
        diva.appendChild(img);
        // alert(index);
        osa[0].appendChild(diva);
    });
      
    }  
