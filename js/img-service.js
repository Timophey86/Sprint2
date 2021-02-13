"use strict";

var gImgId = 0;
var gSearchTermsToShow = 5;
var gImgs = [];
var gImgUrls = [];
var gKeyword = [
  "mad",
  "cute",
  "cute",
  "tired",
  "mad",
  "smart",
  "amazed",
  "yeah right",
  "meanece",
  "laugh",
  "kiss",
  "you",
  "cheers",
  "matrix",
  "exactly",
  "embaraced",
  "putin",
  "visionary",
];


function createImgs() {
  var numOfImgs = gImgUrls.length;
  for (var i = 0; i < numOfImgs - 1; i++) {
    gImgs.push(_createImg());
  }
}

function _createImg() {
  var img = {
    id: gImgId,
    url: gImgUrls[gImgId],
    keywords: [gKeyword[gImgId]],
  };
  gImgId++;
  return img;
}

function getImgUrls(numOfImgs = 18) {
  for (var i = 0; i < numOfImgs; i++) {
    gImgUrls.push(`img/${i + 1}.jpg`);
  }
}

function renderImgs(imgs) {
  var strHtml = imgs
    .map(function (img) {
      return `
      <img id='${img.id}' src='${img.url}' onclick="initCanvas(${img.id},this)" alt='meme picture'/>
      `;
    })
    .join(" ");

  document.querySelector(".gallery").innerHTML = strHtml;
  gImgId = 0;
}
renderKeywords();

function renderKeywords() {
  var filteredKeywords = gKeyword.filter(function (item, pos) {
    return gKeyword.indexOf(item) === pos;
  });
  var strHtml = "Keywords:";
  for (var i = 0; i < filteredKeywords.length; i++) {
    if (i > gSearchTermsToShow) {
      strHtml += `<span class="search-term hidden" onclick="searchMemes(event,this)" style="font-size: 16px;">${filteredKeywords[i]}</span> `;
    } else {
      strHtml += `<span class="search-term" onclick="searchMemes(event,this)" style="font-size: 16px;">${filteredKeywords[i]}</span> `;
    }
  }
  strHtml += ` <span class="more" onclick="expandKeywords()">more...</span>`;
  var elKeywords = document.querySelector(".keywords");
  elKeywords.innerHTML = strHtml;
}

function expandKeywords() {
  var filteredKeywords = gKeyword.filter(function (item, pos) {
    return gKeyword.indexOf(item) === pos;
  });
  if (gSearchTermsToShow < filteredKeywords.length) {
    gSearchTermsToShow += 3;
    renderKeywords();
    console.log("terms to show ", gSearchTermsToShow);
    if (gSearchTermsToShow >= filteredKeywords.length) {
      document.querySelector(".more").classList.add("hidden");
    }
  }
}

function resetKeywords() {
  document.querySelector(".more").classList.remove("hidden");
  gSearchTermsToShow = 5;
  renderKeywords();
}


