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
  hideProressBar();

    

    }
    )
    .catch(error => {
      console.error("Error getting documents: ", error);
      hideProressBar();
    });

    }

function CardGOF(id) {
  window.location.href = "../product/product.html?Product_ID=" + encodeURIComponent(id); 
}
function displayPropertyCardss(querySnapshot,id) {
    // Clear the previous data
  
    // Iterate through the documents in the query snapshot
      // Access data from each document
      const propertyData = querySnapshot;
      const cardBanner = document.createElement("li");
    cardBanner.innerHTML=`
     <section class="search-result-item p-3">

    <div class="search-result-item-body">
        <div class="row">

            <div class="col-sm-12 col-md-12 col-lg-7 cursor align-text-end " onclick="CardGOF('${id}')">
            <h4 class="search-result-item-heading"><a href="#">${propertyData.title}</a></h4>
            <p class="info align-text-end">${propertyData.area}</p>
            <p class="description">${propertyData.description}</p>
                <p class="value3 mt-sm">$${propertyData.price}</p>
                <p class="fs-mini text-muted">For ${propertyData.typeofunit}</p>
                <div class="info align-text-end">
                <div class="infoyaya align-text-end">
                  <ion-icon name="bed-outline"></ion-icon>
                  <p>${propertyData.Bedrooms}</p>
                </div>
                <div class="infoyaya">
                  <ion-icon name="man-outline"></ion-icon>
                  <p>${propertyData.Bathrooms}</p>
                </div>
                <div class="infoyaya">
                  <ion-icon name="square-outline"></ion-icon>
                  <p>${propertyData.Square_ft}</p>
                </div>
              </div>
                <div class="card-footer" style="justify-content:normal;gap:10px;">

                <a href="tel:01119734953"class="butn  call-btn"> 
                <button type="button" class="call-btn"style="font-size: 16px; font-weight: bold; color: white;"><ion-icon name="call-outline" class="btn-wtsapp"></ion-icon>Call</button>
                </a>
                                <button type="button" class="butn whatsapp-btn wts-btn" style="font-size: 16px; font-weight: bold;">
                <ion-icon name="logo-whatsapp" class="btn-wtsapp"></ion-icon> 
                <a href="https://wa.me/1XXXXXXXXXX" style="font-size: 15px; font-weight: bold; color: white;">WhatsApp</a>
              </button>
                </div>
            </div>
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
        </div>
    </div>
</section>`;
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
