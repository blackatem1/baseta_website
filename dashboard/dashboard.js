if (!sessionStorage.getItem('userUid')) {
  window.location.replace("../login/login.html")

  
}
function toggleContent(showId, hideId) {
  var showContent = document.getElementsByClassName(showId);
  var hideContent = document.getElementsByClassName(hideId);
//  console.log( document.getElementsByClassName("theprop").innerHTML);
  if (showId == "larg") {
    document.getElementsByClassName("theprop")[0].innerText = "Add Property";
  }else{
    document.getElementsByClassName("theprop")[0].innerText = "All propertys";
  }
  for (var i=0;i<showContent.length;i+=1){
    showContent[i].style.display = 'block';
  }
  for (var i=0;i<hideContent.length;i+=1){
    hideContent[i].style.display = 'none';
  }

}

function getAllUnits(gets) {
  showProgressBar();
  db.collection(gets).get().then((querySnapshot) => {
      displayUnitCards(querySnapshot)
  });
}
  // let progressBar = document.getElementsByClassName('progress-container');
function showProgressBar() {
  document.getElementById('progress-container').style.display = 'flex';
  // console.log("showedddd");
}
function searchchnagedash() {
  const container = document.querySelector(".asd");
  container.innerHTML = ""; 
  var search = document.getElementById("search").value;
  db.collection("units").get().then((querySnapshot) => {
    let cardNumber = 1; 
    querySnapshot.forEach((doc) => {
      // Access data from each document
      const propertyData = doc.data();
      // console.log(search);

      if (propertyData.area.toLowerCase().includes(search.toLowerCase())) {
            const cardBanner = document.createElement("tr");
             const dateObj = propertyData.date.toDate(); // Assuming propertyData.date is a Firebase Timestamp
             const formattedDate = dateObj.toLocaleDateString('en-EG', {
               year: 'numeric',
               month: 'numeric',
               day: 'numeric'
             });
            cardBanner.innerHTML = `
            <tr>
            <th scope="row">${cardNumber}</th>
            <td>${propertyData.title}</td>
            <td>${propertyData.description}</td>
            <td>${propertyData.area}</td>
            <td>${propertyData.price}</td>
            <td>${propertyData.Square_ft}</td>
            <td>${propertyData.Bathrooms}</td>
            <td>${propertyData.Bedrooms}</td>
            <td>${propertyData.typeofunit}</td>
            <td>${formattedDate}</td>
        
        
           
            <td>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" onclick="showuupdateval('${doc.id}')">Update</button>
        
            </td>
            <td><button type="button" class="btn btn-danger" onclick="Delete('${doc.id}')">delete</button>
            </td>
        
        
          </tr>
        
            `;
            container.appendChild(cardBanner);
            cardNumber++; 
          }
        });
      });
    }
    var loadFiles = function (event) {
      var previewContainer = document.getElementById('preview-container');
      var photosInput = document.getElementById('photos');
    
      // Remove existing previews
      previewContainer.innerHTML = '';
    
      var selectedFiles = event.target.files;
    
      // Limit the number of files to 3
      if (selectedFiles.length > 3) {
        alert('You can only upload up to three files.');
        // Clear the input field to prevent exceeding the limit
        event.target.value = '';
        return;
      }
    
      for (var i = 0; i < selectedFiles.length; i++) {
        var file = selectedFiles[i];
    
        var image = document.createElement('img');
        image.src = URL.createObjectURL(file);
        image.className = 'imgin';
        image.onload = function () {
          URL.revokeObjectURL(this.src); // free memory
        };
    
        // Create a delete button for each image
        var deleteButton = document.createElement('button');
        var show_id = document.createElement('p');
        
        deleteButton.innerHTML = `<p> Remove</p><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
      </svg> 
      `;
        deleteButton.className = 'butn closebtn';
        show_id.className = 'show_id';
        show_id.innerText = i;

        deleteButton.onclick = (function (fileToDelete) {
          return function () {
            // Remove the image and button when delete is clicked
            var container = this.parentNode;
            container.remove();
    
            // Get the current file list from the input
            var currentFiles = Array.from(photosInput.files);
    
            // Remove the deleted file from the file list
            currentFiles = currentFiles.filter(function (f) {
              return f !== fileToDelete; // compare objects
            });
    
            // Update the input element with the remaining files
            var dataTransfer = new DataTransfer();
    
            currentFiles.forEach(function (f) {
              dataTransfer.items.add(f);
            });
    
            // Set the updated files to the input
            photosInput.files = dataTransfer.files;
          };
        })(file); // Pass the current file to the closure
    
        // Create a container div for each image and button
        var container = document.createElement('div');
        container.appendChild(image);
        container.className = 'divin';
        container.appendChild(deleteButton);
        container.appendChild(show_id);
    
        // Append the container to the preview container
        previewContainer.appendChild(container);
      }
    };
  function hideProressBar() {
  // console.log("hide");
  document.getElementById('progress-container').style.display = 'none';
}
  let x = 0;
function displayUnitCards(params) {
  const container = document.querySelector(".asd");
  container.innerHTML = ""; 

  let cardNumber = 1; 
  params.forEach((doc) => {
    // Access data from each document
    const propertyData = doc.data();
    const cardBanner = document.createElement("tr");
     x = x + 1;
     const dateObj = propertyData.date.toDate(); // Assuming propertyData.date is a Firebase Timestamp
     const formattedDate = dateObj.toLocaleDateString('en-EG', {
       year: 'numeric',
       month: 'numeric',
       day: 'numeric'
     });
    cardBanner.innerHTML = `
    <tr>
    <th scope="row">${cardNumber}</th>
    <td>${propertyData.title}</td>
    <td>${propertyData.description}</td>
    <td>${propertyData.desc_ar}</td>
    <td>${propertyData.area}</td>
    <td>${propertyData.area_ar}</td>
    <td>${propertyData.price}</td>
    <td>${propertyData.Square_ft}</td>
    <td>${propertyData.Bathrooms}</td>
    <td>${propertyData.Bedrooms}</td>
    <td>${propertyData.typeofunit}</td>
    <td>${formattedDate}</td>


   
    <td>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" onclick="showuupdateval('${doc.id}')">Update</button>

    </td>
    <td><button type="button" class="btn btn-danger" onclick="Delete('${doc.id}')">delete</button>
    </td>


  </tr>

    `;
    container.appendChild(cardBanner);
    cardNumber++; 
  });
  hideProressBar();
}


function Update(docId) {
  // Assuming you have the document ID stored somewhere

  // Reference to the Firestore document
  showProgressBar();
  var docRef = db.collection("units").doc(docId);

  // Get the document data from Firebase
  docRef.get().then((doc) => {
    hideProressBar();
    if (doc.exists) {
      var data = doc.data();

      // Get the updated values from the form elements
      var title = document.getElementById("title2").value;
      var desc = document.getElementById("desc2").value;
      var desc_ar = document.getElementById("desc-ar2").value;
      var squar = document.getElementById("square_ft2").value;
      var area = document.getElementById("area2").value;
      var area_ar = document.getElementById("area_ar2").value;
      var price = document.getElementById("price2").value;
      var bathr = document.getElementById("bathroom2").value;
      var bedr = document.getElementById("bedroom2").value;
      var type = document.getElementById("unit-type2").value;

      // Replace the fields you want to update with new data
      data.title = title || data.title;
      data.description = desc || data.description;
      data.desc_ar = desc_ar || data.desc_ar;
      data.price = price || data.price;
      data.typeofunit = type || data.typeofunit;
      data.area = area || data.area;
      data.area_ar = area_ar || data.area_ar;
      data.Bedrooms = bedr || data.Bedrooms;
      data.Bathrooms = bathr || data.Bathrooms;
      data.Square_ft = squar || data.Square_ft;

      // You may need to handle the 'photos' field differently,
      // depending on how you're storing and displaying images.

      // Update the document with the new data
      docRef.update(data)
        .then(() => {
          reload();
          hideProressBar();
        })
        .catch((error) => {
          hideProressBar();
          console.error("Error updating document: ", error);
        });
      } else {
      hideProressBar();
      console.log("No such document!");
    }
  }).catch((error) => {
    hideProressBar();
    console.log("Error getting document:", error);
  });
}

//   function Update(docId) {

//  // Assuming you have the document ID stored somewhere

//  // Reference to the Firestore document
//  var docRef = db.collection("units").doc(docId);

//  // Get the document data from Firebase
//  docRef.get().then((doc) => {
//    if (doc.exists) {
//      var data = doc.data();
//      var title = document.getElementById("title").value;
//      var desc = document.getElementById("desc").value;
//      var squar = document.getElementById("square_ft").value;
//      var area = document.getElementById("area").value;
//      var price = document.getElementById("price").value;
//      var bathr = document.getElementById("bathroom").value;
//      var bedr = document.getElementById("bedroom").value;
//      const d = new Date();
//      var type = document.getElementById("unit-type").value;
//      var photosInput = document.getElementById("photos");
//      // Replace the fields you want to update with new data
//      data.title = newData.title || data.title;
//      data.description = newData.description || data.description;
//      data.price = newData.price || data.price;
//      data.typeofunit = newData.typeofunit || data.typeofunit;
//      data.area = newData.area || data.area;
//      data.Bedrooms = newData.Bedrooms || data.Bedrooms;
//      data.Bathrooms = newData.Bathrooms || data.Bathrooms;
//      data.Square_ft = newData.Square_ft || data.Square_ft;

//      // You may need to handle the 'photos' field differently,
//      // depending on how you're storing and displaying images.

//      // Update the document with the new data
//      docRef.update(data)
//        .then(() => {
//          console.log("Document successfully updated!");
//        })
//        .catch((error) => {
//          console.error("Error updating document: ", error);
//        });
//    } else {
//      console.log("No such document!");
//    }
//  }).catch((error) => {
//    console.log("Error getting document:", error);
//  });

//   }

  function showuupdateval(docId){
    showProgressBar();
    var myModal = new bootstrap.Modal(document.getElementById('staticBackdropupdate'));
    myModal.show();
    // Reference to the Firestore document
    var docRef = db.collection("units").doc(docId);
  
    // Get the document data from Firebase
    docRef.get().then((doc) => {
      if (doc.exists) {
        var data = doc.data();
  
        // Populate form inputs with data from Firebase
        document.getElementById("title2").value = data.title || "";
        document.getElementById("desc2").value = data.description || "";
        document.getElementById("desc-ar2").value = data.desc_ar || "";
        document.getElementById("price2").value = data.price || "";
        document.getElementById("unit-type2").value = data.typeofunit || "";
        document.getElementById("area2").value = data.area || "";
        document.getElementById("area_ar2").value = data.area_ar || "";
        document.getElementById("bedroom2").value = data.Bedrooms || "";
        document.getElementById("bathroom2").value = data.Bathrooms || "";
        document.getElementById("square_ft2").value = data.Square_ft || "";
        document.getElementById("update").addEventListener('click', function() {Update(docId)})

        hideProressBar();
  
        // You may need to handle the 'photos' input differently,
        // depending on how you're storing and displaying images.
  
        // Now you have populated the form with data from Firebase
        // You can proceed with the rest of your logic or show the modal, etc.
      } else {
        console.log("No such document!");
      hideProressBar();
        
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
      hideProressBar();

    });


  }
  function deleteImageFromStorage(imageUrls) {
    var storage = firebase.storage();
    imageUrls.forEach(imageUrl => {
      var pathOrFilename = extractPathOrFilename(imageUrl);
      var img = "/images/";
      var fullp = img.concat(pathOrFilename);
      const storageRef = storage.ref("/images/" + pathOrFilename);
  
      storageRef
        .delete()
        .then(() => {
          d += 1;
          console.log('Image deleted successfully', d);
        })
        .catch((error) => {
          console.error('Error deleting image', error);
        });
    });
  }
  
  function extractPathOrFilename(imageUrl) {
    try {
      const url = new URL(decodeURIComponent(imageUrl));
      const pathSegments = url.pathname.split('/');
      const validSegments = pathSegments.filter(segment => segment !== '');
      return validSegments.length > 0 ? validSegments[validSegments.length - 1] : null;
    } catch (error) {
      console.error('Error extracting path or filename:', error);
      return null;
    }
  }
  
  var d = 0;
  
  function Delete(params) {
    const confirmed = confirm("Are you sure you want to delete this image?");
  
    if (!confirmed) {
      console.log("Deletion canceled by user.");
      return;
    }
  
    showProgressBar();
  
    const documentIdToDelete = params;
    const docRefToDelete = db.collection("units").doc(documentIdToDelete);
  
    docRefToDelete.get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          const productData = docSnapshot.data();
          return docRefToDelete.delete().then(() => productData);
        } else {
          console.log("Document does not exist");
          hideProressBar();
          window.location.reload();
          return null;
        }
      })
      .then((productData) => {
        if (productData) {
          deleteImageFromStorage(productData.photos);
          hideProressBar();
          console.log(d, productData.photos.length);
  
          if (d == productData.photos.length) {
            window.location.reload();
          }
        }
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
        hideProressBar();
        window.location.reload();
      });
  }
  
//   function deleteImageFromStorage(imageUrls) {
//     var storage = firebase.storage();
//     imageUrls.forEach(imageUrl => {
//       var pathOrFilename = extractPathOrFilename(imageUrl);
  
    
//       // Create a non-root reference using .child()
//       img= "/images/";
//       fullp = img.concat(pathOrFilename)
//       const storageRef = storage.ref("/images/"+pathOrFilename);
    
//       // Delete the file
//       storageRef
//         .delete()
//         .then(() => {
//           d+=1 ;
//           console.log('Image deleted successfully',d);
//         })
//         .catch((error) => {
//           console.error('Error deleting image', error);
//         });
//     });
//   }
// function extractPathOrFilename(imageUrl) {
//   try {
//     const url = new URL(decodeURIComponent(imageUrl));
//     const pathSegments = url.pathname.split('/');
//     const validSegments = pathSegments.filter(segment => segment !== '');
//     return validSegments.length > 0 ? validSegments[validSegments.length - 1] : null;
//   } catch (error) {
//     console.error('Error extracting path or filename:', error);
//     return null;
//   }
// }
//   d=0;
//   function Delete(params) {
//     const confirmed = confirm("Are you sure you want to delete this image?");

//     if (!confirmed) {
//       console.log("Deletion canceled by user.");
//       return;
//     }
//     showProgressBar();
//     const documentIdToDelete = params;
  
//     const docRefToDelete = db.collection("units").doc(documentIdToDelete);
  
//     docRefToDelete.get()
//       .then((docSnapshot) => {
//         if (docSnapshot.exists) {
//           const productData = docSnapshot.data();
//           return docRefToDelete.delete().then(() => productData);
//         } else {
//           console.log("Document does not exist");
//           window.location.reload();

//           hideProressBar();

//           return null;
//         }

//         if (d == productData.photos.length) {
            
//           window.location.reload();
//         }
//       })
//       .then((productData) => {
//         if (productData) {
//           deleteImageFromStorage(productData.photos);
//           hideProressBar();
//           console.log(d ,productData.photos.length );

//         }

//       })
//       .catch((error) => {
//         console.error("Error deleting document:", error);
//         hideProressBar();
//         window.location.reload();

//       });

//   }
  function Add_unit() {
    showProgressBar();
    event.preventDefault();
    var title = document.getElementById("title").value;
    var desc = document.getElementById("desc").value;
    var desc_ar = document.getElementById("desc-ar").value;
    var squar = document.getElementById("square_ft").value;
    var area = document.getElementById("area").value;
    var area_ar = document.getElementById("area_ar").value;
    var price = document.getElementById("price").value;
    var bathr = document.getElementById("bathroom").value;
    var bedr = document.getElementById("bedroom").value;
    const d = new Date();
    var type = document.getElementById("unit-type").value;
    var photosInput = document.getElementById("photos");

      var photosFiles = photosInput.files;
      var uploadPromises = [];
      function generateRandomName() {
        const timestamp = new Date().getTime();
        const randomString = Math.random().toString(36).substring(2);
        return `${timestamp}_${randomString}`;
      }
      for (var i = 0; i < photosFiles.length; i++) {
        var file = photosFiles[i];
        var imageName = generateRandomName(); // Use the generated name for the image
        var storageRef = firebase.storage().ref('images/' + imageName);
        var uploadTask = storageRef.put(file);
        uploadPromises.push(uploadTask.then(snapshot => snapshot.ref.getDownloadURL()));
      }
      Promise.all(uploadPromises)
        .then(downloadURLs => {
          // Now, downloadURLs is an array of the download URLs for the uploaded images
    
          // Retrieve existing photos array from Firestore
          return db.collection("units").add({
            title: title,
            price: price,
            typeofunit: type,
            area: area,
            area_ar:area_ar,
            Square_ft: squar,
            Bathrooms: bathr,
            Bedrooms: bedr,
            description: desc,
            desc_ar: desc_ar,
            date: d,
            photos: [] // Initialize the photos array in the document
          })
          .then(docRef => {
            // Update the document with the new download URLs
            return docRef.update({
              photos: firebase.firestore.FieldValue.arrayUnion(...downloadURLs)
            });
          });
        })
        .then(() => {
          hideProressBar();

          var myModal = new bootstrap.Modal(document.getElementById('staticBackdropconfirmload'));
          myModal.show();
        })
        .catch(error => {
          hideProressBar();

          console.error("Error updating document: ", error);
        });
  }
  function reload() {
    window.location.reload();
  }





  
