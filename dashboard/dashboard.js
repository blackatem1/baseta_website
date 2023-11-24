
  function toggleContent(showId, hideId) {
    var showContent = document.getElementsByClassName(showId);
    var hideContent = document.getElementsByClassName(hideId);
  //  console.log( document.getElementsByClassName("theprop").innerHTML);
    if (showId == "larg") {
      document.getElementsByClassName("theprop")[0].innerText = "Add Projects";
    }else{
      document.getElementsByClassName("theprop")[0].innerText = "All Projects";
    }
    for (var i=0;i<showContent.length;i+=1){
      showContent[i].style.display = 'block';
    }
    for (var i=0;i<hideContent.length;i+=1){
      hideContent[i].style.display = 'none';
    }

  }
  function login() {
    console.log("asas");
  
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
  
    // Get the FileList from the input element
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
        alert("document created");
        // location.reload();
      })
      .catch(error => {
        console.error("Error updating document: ", error);
      });
  }
  
//  function login() {
// console.log("asas")
// var title = document.getElementById("title").value;
// var desc = document.getElementById("desc").value;
// var squar = document.getElementById("square_ft").value;
// var area = document.getElementById("area").value;
// var price = document.getElementById("price").value;
// var bathr = document.getElementById("bathroom").value;
// var bedr = document.getElementById("bedroom").value;
// const d = new Date();
// var type = document.getElementById("unit-type").value;
// var photosInput  = document.getElementById("photos");
// var photosFiles = photosInput.files;

//   // Array to store Promises of image uploads
//   var uploadPromises = [];

//   // Loop through each selected file
//   for (var i = 0; i < photosFiles.length; i++) {
//     var file = photosFiles[i];
//     var imageName = "image_" + i; // You can adjust the image name as needed

//     // Upload the image to Firebase Storage
//     var storageRef = firebase.storage().ref('images/' + imageName);
//     var uploadTask = storageRef.put(file);

//     // Store the promise of the upload task in the array
//     uploadPromises.push(uploadTask.then(snapshot => snapshot.ref.getDownloadURL()));
//   }

//   // Wait for all image uploads to complete
//   Promise.all(uploadPromises)
//     .then(downloadURLs => {
//       // Now, downloadURLs is an array of the download URLs for the uploaded images

//       // Create a document in Firestore with the collected data
//       return db.collection("units").add({
//         title: title,
//         price: price,
//         photos: downloadURLs,
//         typeofunit: type,
//         area: area,
//         Square_ft: squar,
//         Bathrooms: bathr,
//         Bedrooms: bedr,
//         description: desc,
//         date: d,
//       });
//     })
//     .then((docRef) => {
//         console.log("Document written with ID: ", docRef.id);
//     })
//     .catch((error) => {
//         console.error("Error adding document: ", error);
//     });

//   }  

