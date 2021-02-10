'use strict'

var gImgId = 0
// var gKeywords = { happy: 12, "funny puk": 1 };
var gImgUrls = []
var gKeyword = ["mad","cute","cute","tired","mad","smart","amazed","yeah right","meanece","laugh","kiss","you","cheers","matrix","exactly","embaraced","putin","visionary"]
// var gImgs = [
//   { id: 0, url: "img/1.jpg", keywords: ["mad"] },
//   { id: 1, url: "img/2.jpg", keywords: ["cute"] },
// ];

var gImgs = []




function createImgs () {
    var numOfImgs=gImgUrls.length
    for (var i = 0; i<numOfImgs-1; i++) {
        gImgs.push(_createImg())
    }
}

function _createImg () {
    var img = {
        id: gImgId,
        url: gImgUrls[gImgId],
        keywords: [gKeyword[gImgId]]
    }
    gImgId++
    // console.log(img.id);
    return img
}

function getImgUrls (numOfImgs = 18) {
    for (var i = 0; i<numOfImgs; i++) {
        gImgUrls.push(`img/${i+1}.jpg`)
    }
}

function renderImgs(imgs) {
  var strHtml = imgs.map(function (img) {
      return `
      <img id='${img.id}' src='${img.url}' onclick="initCanvas(${img.id},this)" alt='meme picture'/>
      `;
    })
    .join(" ");

  document.querySelector(".gallery").innerHTML = strHtml;
  gImgId=0
}