"use strict";

function init() {
  getImgUrls();
  createImgs();
  renderImgs(gImgs);
  createMemes();
}

function setFont(elFont) {
  gMemeFont = elFont.value;
  drawCanvas(gCurrMemeIdx);
}

function searchMemes(e) {
  var searchedImgs = [];
  var elSearchBar = document.querySelector(".search-input");
  var searchTerm;
  var searchTermId 
  if (!e) {
    searchTerm = elSearchBar.value;
    var filteredKeywords = gKeyword.filter(function (item, pos) {
      return gKeyword.indexOf(item) === pos;
    });
   searchTermId = filteredKeywords.findIndex(function(word) {
      return word === searchTerm
    })
  } else {
    searchTermId = e.target.id
    searchTerm = e.target.innerText;
    elSearchBar.value = "";
  }
  gImgs.forEach(function (img) {
    if (img.keywords.includes(searchTerm)) {
      searchedImgs.push(img);
    }
  });
  gDisplayedImgs = searchedImgs.length;
  if (!searchedImgs.length) {
    renderImgs(gImgs);
    var elMiniModal = document.querySelector(".search-modal");
    elMiniModal.style.display = "block";
  } else {
    renderImgs(searchedImgs);
  }
  console.log(searchTermId)
  resetKeywords(searchTermId);
}

//Search by pressing the enter button
var elSearchInput = document.querySelector(".search-input");
elSearchInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchMemes();
  }
});

//Drag and drop eventlisteners
gCanvas.addEventListener("mousedown", myDown);
gCanvas.addEventListener("mouseup", myUp);
gCanvas.addEventListener("mousemove", myMove);

//Close the "Enter diffrent keyword modal"
function closeModal(elMiniModal) {
  elMiniModal.style.display = "none";
}

//The hamburger menu
function toglleMenu() {
  document.body.classList.toggle("open");
}

function toggleAbout() {
  var elAboutModal = document.querySelector(".about-modal");
  elAboutModal.classList.toggle("hidden");
}

// SHARE IMG FUNCTION
function uploadImg(elForm, ev) {
  ev.preventDefault();
  document.getElementById("imgData").value = gCanvas.toDataURL("image/jpeg");

  function onSuccess(uploadedImgUrl) {
    uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
    console.log("uploadedImgUrl:", uploadedImgUrl);
    document.querySelector(".share-container").innerHTML = `
      <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
         Share   
      </a>`;
  }

  doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
  var formData = new FormData(elForm);
  fetch("//ca-upload.com/here/upload.php", {
    method: "POST",
    body: formData,
  })
    .then(function (res) {
      return res.text();
    })
    .then(onSuccess)
    .catch(function (err) {
      console.error(err);
    });
}

//ON IMAGE UPLOAD
var gImg;

function onImgInput(ev) {
  loadImageFromInput(ev, renderUploadImg);
}

function loadImageFromInput(ev, onImageReady) {
  document.querySelector(".share-container").innerHTML = "";
  var reader = new FileReader();

  reader.onload = function (event) {
    var img = new Image();
    img.onload = onImageReady.bind(null, img);
    img.src = event.target.result;
    gImgObj = img;
  };
  reader.readAsDataURL(ev.target.files[0]);
}

function renderUploadImg(img) {
  gCanvas.width = 500;
  gCanvas.height = 500;
  gCtx = gCanvas.getContext("2d");
  drawImageScaled(img, gCtx)
  gMemes.push(_createMeme());
  var lineNum = 0;
  var meme = gMemes.find(function (meme) {
    return (gImgId-1) === meme.selectedImgId;
  });
  currMeme = meme;
  gCurrMemeIdx = currMeme.selectedImgId
  meme.lines.forEach(function (txt) {
    if (lineNum === gCurrLine) {
      drawTxt(txt, true);
    } else {
      drawTxt(txt);
    }
    lineNum++;
  });
}

function callInput() {
  toggleView();
  var elInput = document.querySelector('input[name="image"]');
  elInput.click();
}
