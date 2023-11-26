
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
    db.collection(gets).get().then((querySnapshot) => {
      displayUnitCards(querySnapshot)
  });}

  let x = 0;
function displayUnitCards(params) {
  document.getElementsByClassName("asd").innerHTML ="";
  // Iterate through the documents in the query snapshot
  params.forEach((doc) => {
    // Access data from each document
    const propertyData = doc.data();
    const cardBanner = document.createElement("tr");
     x=x+1;
    cardBanner.innerHTML = `
    <tr>
    <th scope="row">${Number(x)}</th>
    <td>${propertyData.title}</td>
    <td>${propertyData.description}</td>
    <td>${propertyData.area}</td>
    <td>${propertyData.price}</td>
    <td>${propertyData.Square_ft}</td>
    <td>${propertyData.Bathrooms}</td>
    <td>${propertyData.Bedroom}</td>
    <td>${propertyData.typeofunit}</td>
   
    <td>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" onclick="showuupdateval('${doc.id}')">Update</button>

    </td>
    <td><button type="button" class="btn btn-danger" onclick="Delete('${doc.id}')">delete</button>
    </td>


  </tr>

    `
    x= document.getElementsByClassName("asd");
    x[0].appendChild(cardBanner);
  });
  
}


function Update(docId) {
  // Assuming you have the document ID stored somewhere

  // Reference to the Firestore document
  var docRef = db.collection("units").doc(docId);

  // Get the document data from Firebase
  docRef.get().then((doc) => {
    if (doc.exists) {
      var data = doc.data();

      // Get the updated values from the form elements
      var title = document.getElementById("title2").value;
      var desc = document.getElementById("desc2").value;
      var squar = document.getElementById("square_ft2").value;
      var area = document.getElementById("area2").value;
      var price = document.getElementById("price2").value;
      var bathr = document.getElementById("bathroom2").value;
      var bedr = document.getElementById("bedroom2").value;
      var type = document.getElementById("unit-type2").value;

      // Replace the fields you want to update with new data
      data.title = title || data.title;
      data.description = desc || data.description;
      data.price = price || data.price;
      data.typeofunit = type || data.typeofunit;
      data.area = area || data.area;
      data.Bedrooms = bedr || data.Bedrooms;
      data.Bathrooms = bathr || data.Bathrooms;
      data.Square_ft = squar || data.Square_ft;

      // You may need to handle the 'photos' field differently,
      // depending on how you're storing and displaying images.

      // Update the document with the new data
      docRef.update(data)
        .then(() => {
          reload();
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    } else {
      console.log("No such document!");
    }
  }).catch((error) => {
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
        document.getElementById("price2").value = data.price || "";
        document.getElementById("unit-type2").value = data.typeofunit || "";
        document.getElementById("area2").value = data.area || "";
        document.getElementById("bedroom2").value = data.Bedrooms || "";
        document.getElementById("bathroom2").value = data.Bathrooms || "";
        document.getElementById("square_ft2").value = data.Square_ft || "";
        document.getElementById("update").addEventListener('click', function() {Update(docId)})

  
        // You may need to handle the 'photos' input differently,
        // depending on how you're storing and displaying images.
  
        // Now you have populated the form with data from Firebase
        // You can proceed with the rest of your logic or show the modal, etc.
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });


  }


  function Delete(params) {
    // Assume you have the document ID
    const documentIdToDelete = params;

    // Reference to the document
    const docRefToDelete = db.collection("units").doc(documentIdToDelete);

    // Delete the document
    docRefToDelete.delete()
      .then(() => {
        alert("Document successfully deleted!");
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error deleting document: ", error);
      });

  }

  function Add_unit() {
    event.preventDefault();
    var title = document.getElementById("title").value;
    var desc = document.getElementById("desc").value;
    var squar = document.getElementById("square_ft").value;
    var area = document.getElementById("area").value;
    var price = document.getElementById("price").value;
    var bathr = document.getElementById("bathroom").value;
    var bedr = document.getElementById("bedroom").value;
    const d = new Date();
    var type = document.getElementById("unit-type").value;
    var photosInput = document.getElementById("photos");

      var photosFiles = photosInput.files;
    
      // Array to store Promises of image uploads
      var uploadPromises = [];
    
      // Function to generate a unique and random name for each image
      function generateRandomName() {
        const timestamp = new Date().getTime();
        const randomString = Math.random().toString(36).substring(2);
        return `${timestamp}_${randomString}`;
      }
    
      // Loop through each selected file
      for (var i = 0; i < photosFiles.length; i++) {
        var file = photosFiles[i];
        var imageName = generateRandomName(); // Use the generated name for the image
    
        // Upload the image to Firebase Storage
        var storageRef = firebase.storage().ref('images/' + imageName);
        var uploadTask = storageRef.put(file);
    
        // Store the promise of the upload task in the array
        uploadPromises.push(uploadTask.then(snapshot => snapshot.ref.getDownloadURL()));
      }
    
      // Wait for all image uploads to complete
      Promise.all(uploadPromises)
        .then(downloadURLs => {
          // Now, downloadURLs is an array of the download URLs for the uploaded images
    
          // Retrieve existing photos array from Firestore
          return db.collection("units").add({
            title: title,
            price: price,
            typeofunit: type,
            area: area,
            Square_ft: squar,
            Bathrooms: bathr,
            Bedrooms: bedr,
            description: desc,
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
          var myModal = new bootstrap.Modal(document.getElementById('staticBackdropconfirmload'));
          myModal.show();
        })
        .catch(error => {
          console.error("Error updating document: ", error);
        });
  }
  function reload() {
    window.location.reload();
  }
  