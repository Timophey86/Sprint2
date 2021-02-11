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

function searchMemes() {
  var searchedImgs = [];
  var elSearchBar = document.querySelector(".search-input");
  gImgs.forEach(function (img) {
    if (img.keywords.includes(elSearchBar.value)) {
      searchedImgs.push(img);
    }
  });
  if (!searchedImgs.length) {
    renderImgs(gImgs);
    var elMiniModal = document.querySelector(".search-modal");
    elMiniModal.style.display = "block";
  } else {
    renderImgs(searchedImgs);
  }
}

function closeModal(elMiniModal) {
    elMiniModal.style.display = "none";
}

function toglleMenu() {
    document.body.classList.toggle("open");
    
}
