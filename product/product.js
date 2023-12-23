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
        displayPropertyCardss(querySnapshot);
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
    document.getElementsByClassName("property-list").innerHTML ="";
  
    // Iterate through the documents in the query snapshot
      // Access data from each document
      const propertyData = querySnapshot;
      const cardBanner = document.createElement("li");
    cardBanner.innerHTML=` <section class="search-result-item p-3">
    <img class="image" src="${propertyData.photos[0]}">
    <div class="search-result-item-body">
        <div class="row">
            <div class="col-sm-9 ">
                <h4 class="search-result-item-heading"><a href="#">${propertyData.title}</a></h4>
                <p class="info">${propertyData.area}</p>
                <p class="description">${propertyData.description}</p>
            </div>
            <div class="col-sm-3 col-lg-12 text-align-center">
                <p class="value3 mt-sm">$${propertyData.price}</p>
                <p class="fs-mini text-muted">For ${propertyData.typeofunit}</p>
                <div class="info">
                <div class="infoyaya">
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

                <button type="button" class="btn btn-primary wts-btn call-btn"><ion-icon name="call-outline" class="btn-wtsapp"></ion-icon><a href="tel:01111111111111"style="font-size: 16px; font-weight: bold; color: white;"> Call</a></button>
                <button type="button" class="btn whatsapp-btn wts-btn" style="font-size: 16px; font-weight: bold;">
                <ion-icon name="logo-whatsapp" class="btn-wtsapp"></ion-icon> 
                <a href="https://wa.me/1XXXXXXXXXX" style="font-size: 15px; font-weight: bold; color: white;">WhatsApp</a>
              </button>
                </div>
            </div>
        </div>
    </div>
</section>`;
x= document.getElementsByClassName("sreasults");
x[0].appendChild(cardBanner);
      
    }  
