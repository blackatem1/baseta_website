
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