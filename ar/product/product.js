// Get the search query from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var Product_ID = urlParams.get('Product_ID');
// function hideProressBar() {
//   // console.log("hide");
//   document.getElementById('progress-container').style.display = 'none';
// }
// function showProgressBar() {
//   document.getElementById('progress-container').style.display = 'flex';
//   // console.log("showedddd");
// }
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
showProgressBar();
const collectionRef = db.collection("units");
collectionRef.get()
  .then(
    querySnapshot => {
      querySnapshot.forEach(doc => {
      const data = doc.data();
      // Perform client-side filtering
      //  console.log(data.area);
      data.area =data.area.toLowerCase();
      if (doc.id == Product_ID) {
        document.title = "Baseta - "+data.title;
        displayPropertyCardss(data);
      }
    });
    hideProressBar();
  }
  )
  .catch(error => {
    console.error("Error getting documents: ", error);
    hideProressBar();
  });



function displayPropertyCardss(querySnapshot) {
    // Clear the previous data
    const propertyData = querySnapshot;
    osa=document.getElementsByClassName("carousel-inner");

    osa.innerHTML ="";
    
    // Iterate through the documents in the query snapshot
    // Access data from each document
    propertyData.photos.forEach((element, index) => {
        diva = document.createElement("div");
        if (index == 0) {
          diva.className = "carousel-item active h-100";
        }else{
          diva.className = "carousel-item h-100";
        }
        
        img = document.createElement("img");
        img.className = "d-block img-prod-caro w-100 h-100";
        img.src = element;
        diva.appendChild(img);
        // alert(index);
        osa[0].appendChild(diva);
    });
    // alert(document.getElementById("title-pro").innerHTML );
    document.getElementById("title-pro").innerHTML=
    propertyData.title = getArabicTranslation(propertyData.title);

    document.getElementById("conss").innerHTML=`      
    <div  style="left:0  ;right:auto;" class="card-badge ${propertyData.typeofunit === 'rent' ? 'green' : 'blue'}">${propertyData.typeofunit === 'rent' ? 'للأيجار' : 'للبيع'}</div>

  <div class="card-content" style="padding:0 !important"  >
    <div class="card-price">
     <strong>${propertyData.price}</strong>/${propertyData.typeofunit === 'rent' ? 'في الشهر' : 'السعر الكلي'}
    </div>

    <p class="card-text" style="font-size:1rem !important">
    ${propertyData.desc_ar}
    </p>
    <div class="banner-actions" style="display:flex !important;padding:2% 0">
    <button class="banner-actions-btn"style="color:black !important;width:fit-content;margin-right:2rem">
    <address>${propertyData.area_ar}</address>
      <ion-icon name="location"></ion-icon>
    </button>
    <button class="banner-actions-btn" style="color:black !important ;margin-right:0">
    <span>${propertyData.photos.length}</span>
    <ion-icon name="camera"></ion-icon>
    </button>
   
  </div>
    <ul class="card-list cl-sea" style="margin-bottom:.5rem">
    <li class="card-item ci-sea">
      <strong>${propertyData.Bedrooms}</strong>
      <ion-icon name="bed-outline"></ion-icon>
      <span>غرف النوم</span>
    </li>
    <li class="card-item ci-sea">
      <strong>${propertyData.Bathrooms}</strong>
      <ion-icon name="man-outline"></ion-icon>
      <span>الحمامات</span>
    </li>
    <li class="card-item ci-sea">
      <strong>${propertyData.Square_ft}</strong>
      <ion-icon name="square-outline"></ion-icon>
      <span>قدم مربع</span>
    </li>
  </ul>
  </div>`;
    // document.getElementById("perwhat").innerHTML="/ " +propertyData.typeofunit === 'rent' ? 'MONTHLY' : 'TOTAL PRICE';
    // document.getElementById("price-pro").innerHTML="$ "+propertyData.price;
    // document.getElementById("desc-prod").innerHTML=propertyData.description;
      
    }  
