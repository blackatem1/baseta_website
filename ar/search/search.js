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
function share_search(id) {
  let copyText =window.location.origin+"/BASETA_WEBSITE/ar/product/product.html?Product_ID=" + encodeURIComponent(id);
  analytics.logEvent('shared', {share_link:window.location.href })
  navigator.clipboard.writeText(copyText);
  document.getElementById("shareButton_"+id).innerText="تم النسخ الي الحافظه";
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
        if (data.area_ar.includes(searchQuery)) {
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
    const NotfoundT = document.createElement("li");
    NotfoundT.innerText= "لا يوجد نتائج لبحثك";
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

function CardGOF(id) {
  window.location.href = "../product/product.html?Product_ID=" + encodeURIComponent(id); 
}
function displayPropertyCardss(querySnapshot,id) {
    // Clear the previous data
  
    // Iterate through the documents in the query snapshot
      // Access data from each document
      const propertyData = querySnapshot;
      const cardBanner = document.createElement("li");
     ar_title = getArabicTranslation(propertyData.title);
     price = propertyData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    cardBanner.innerHTML=`
     <section class="search-result-item p-3">

    <div class="search-result-item-body">
        <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-7 align-texdt-end   prop-card"  >
        <div class="card-baddge  ${propertyData.typeofunit === 'rent' ? 'green' : 'blue'}">${propertyData.typeofunit === 'rent' ? 'للايجار' : 'للبيع'} </div>
        <div class="titles-sea">
        <h4 class="search-result-item-heading">${ar_title}</h4>
        <ion-icon name="home" class="home_100"></ion-icon> 
        </div>
        
          <div class="inf-are">
          <p class="info inf-are"> ${propertyData.area_ar}</p>
          <ion-icon name="location-outline"></ion-icon>
          </div>       
          <p class="description" style="">${propertyData.desc_ar}</p>
              <p class="value3 mt-sm">
              ${propertyData.typeofunit === 'rent' ? 'في الشهر' : 'السعر الكلي'}/
              <strong>${price} جنيه</strong> 
              </p>
            <ul class="card-list cl-sea">
            <li class="card-item ci-sea">
              <strong>${propertyData.Bedrooms}</strong>
              <ion-icon name="bed-outline"></ion-icon>
              <span>غرف النوم</span>
            </li>
            <li class="card-item ci-sea">
              <strong>${propertyData.Bathrooms}</strong>
              <ion-icon name="man-outline"></ion-icon>
              <span>حمامات</span>
            </li>
            <li class="card-item ci-sea">
              <strong>${propertyData.Square_ft}</strong>
              <ion-icon name="square-outline"></ion-icon>
              <span>قدم مربع</span>
            </li>
          </ul>
              <div class="card-footer" style="flex-direction:column;gap:10px;">
              <div style="display: inline-flex;
              /* justify-content: space-evenly; */
              gap: 4%;">
              <a href="tel:01090009000"class="  call-btn "> 
              <button type="button" class="butn call-btn"style="font-size: 16px; font-weight: bold; color: white;">
              اتصال
              <ion-icon name="call-outline" class="btn-wtsapp"></ion-icon>
              </button>
              </a>
              <a href="https://wa.me/01090009000"class="  whatsapp-btn "> 
              <button type="button" class="butn whatsapp-btn"style="font-size: 16px; font-weight: bold; color: white;">
              واتساب
              <ion-icon name="logo-whatsapp" class="btn-wtsapp"></ion-icon>
              </button>
              </a> 
              </div>
              <div class="buttons sharebtn w-100">
              <a class="upper-share-btn butn wb-a" style="
              width: 100% !important;"> 
                <button type="button" id="shareButton_${id}" onclick="share_search('${id}')" class=" share-btn"style="font-size: 16px; font-weight: bold; color: white;">مشاركه<ion-icon name="share-social-outline"class="btn-wtsapp"></ion-icon></button>
              </a>
            </div>
              
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
    function change_page(){
      window.location.href = "../../login/login.html";
    } 
    