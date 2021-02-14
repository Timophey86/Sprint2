"use strict";
var gCanvas = document.querySelector(".meme-canvas");
var gImgObj;
var gCtx;
var gCurrMemeIdx;
var gCurrLine = 0;
var gNumOfLines = 2;
var gMemeFont = "impact";
var gMemes = [];
var currMeme;
var gDisplayedImgs = 18;
var gDragging = false;

//Render Memes Pages
function createMemes() {
  var numOfMemes = gImgUrls.length;
  for (var i = 0; i < numOfMemes; i++) {
    gMemes.push(_createMeme());
  }
}

function _createMeme() {
  var meme = {
    selectedImgId: gImgId,
    selectedLineIdx: 0,
    lines: [
      {
        txt: "Text",
        size: 50,
        align: "left",
        color: "red",
        width: 0,
        x: 200,
        y: 70,
        isDragging: false,
      },
      {
        txt: "Text",
        size: 50,
        align: "left",
        color: "red",
        width: 0,
        x: 200,
        y: 450,
        isDragging: false,
      },
    ],
  };
  gImgId++;
  return meme;
}

function _createText() {
  return {
    txt: "New Text",
    size: 40,
    align: "left",
    color: "red",
    width: 0,
    x: 150,
    y: 250,
    isDragging: false,
  };
}

function _createEmoji(emoji) {
  var canvas = document.querySelector(".meme-canvas");
  return {
    txt: emoji,
    size: 60,
    align: "center",
    x: canvas.width / 2,
    y: canvas.height / 2,
    isDragging: false,
  };
}

//CANVAS CONTROL

function initEmptyCanvas () {
  toggleView();
  var canvas = document.querySelector(".meme-canvas");
  gCtx = canvas.getContext("2d");
}

function initCanvas(imgId) {
  toggleView();
  gCurrMemeIdx = imgId;
  var canvas = document.querySelector(".meme-canvas");
  gCtx = canvas.getContext("2d");

  gImgObj = new Image();
  gImgObj.src = getImgSrc(gCurrMemeIdx);

  gImgObj.onload = function () {
    canvas.width = gImgObj.width;
    canvas.height = gImgObj.height;
    drawCanvas(gCurrMemeIdx);
  };
}

function drawCanvas(imgId) {
  var lineNum = 0;
  // gCtx.drawImage(gImgObj, 0, 0);
  drawImageScaled(gImgObj, gCtx)
  var meme = gMemes.find(function (meme) {
    return imgId === meme.selectedImgId;
  });
  currMeme = meme;
  meme.lines.forEach(function (txt) {
    if (lineNum === gCurrLine) {
      drawTxt(txt, true);
    } else {
      drawTxt(txt);
    }
    lineNum++;
  });
}

function drawImageScaled(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  console.log(vRatio)
  var ratio = Math.min(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}

function drawTxt(txt, outline) {
  txt.fontFamily = gMemeFont;
  if (outline) {
    gCtx.font = txt.size + "px" + " " + txt.fontFamily;
    gCtx.textAlign = txt.align;
    gCtx.fillStyle = txt.color;
    gCtx.strokeStyle = "white";
    gCtx.lineWidth = 2;
    txt.width = gCtx.measureText(txt).width;
    gCtx.fillText(txt.txt, txt.x, txt.y);
    gCtx.strokeText(txt.txt, txt.x, txt.y);
  } else {
    gCtx.font = txt.size + "px" + " " + txt.fontFamily;
    gCtx.textAlign = txt.align;
    gCtx.fillStyle = txt.color;
    txt.width = gCtx.measureText(txt).width;
    gCtx.fillText(txt.txt, txt.x, txt.y);
  }
}

function getImgSrc(imgId) {
  var imgIdx = gImgs.findIndex(function (img) {
    return imgId === img.id;
  });

  return gImgs[imgIdx].url;
}
// MEME CONTROLLER

function changeTxt(elText) {
  var value = elText.value;
  var meme = gMemes[gCurrMemeIdx];
  meme.lines[gCurrLine].txt = value;
  drawCanvas(gCurrMemeIdx);
}

function addEmoji(elEmoji) {
  var meme = gMemes[gCurrMemeIdx];
  meme.lines.push(_createEmoji(elEmoji.innerText));
  gCurrLine = 0;
  gNumOfLines += 1;
  drawCanvas(gCurrMemeIdx);
}

function setSize(elSize) {
  var value = elSize.value;
  var meme = gMemes[gCurrMemeIdx];
  meme.lines[gCurrLine].size = value;
  drawCanvas(gCurrMemeIdx);
}

function setCoord(elCoord) {
  var coord = elCoord.dataset.property;
  var meme = gMemes[gCurrMemeIdx];
  console.log(coord);
  if (coord === "x") {
    var value = elCoord.value;
    meme.lines[gCurrLine].x = value;
    drawCanvas(gCurrMemeIdx);
  } else {
    var value = elCoord.value;
    meme.lines[gCurrLine].y = value;
    drawCanvas(gCurrMemeIdx);
  }
}

function setColor(elColor) {
  var color = elColor.value;
  var meme = gMemes[gCurrMemeIdx];
  meme.lines[gCurrLine].color = color;
  drawCanvas(gCurrMemeIdx);
}

function alignText(elAlign) {
  var alignTo = elAlign.dataset.direction;
  var meme = gMemes[gCurrMemeIdx];
  console.log(meme);
  if (alignTo === "left") {
    meme.lines[gCurrLine].x = 10;
    drawCanvas(gCurrMemeIdx);
  } else if (alignTo === "center") {
    meme.lines[gCurrLine].x = 210;
    drawCanvas(gCurrMemeIdx);
  } else {
    meme.lines[gCurrLine].x = 400;
    drawCanvas(gCurrMemeIdx);
  }
}

function deleteTxt() {
  var meme = gMemes[gCurrMemeIdx];
  meme.lines.splice(gCurrLine, 1);
  gCurrLine = 0;
  gNumOfLines -= 1;
  drawCanvas(gCurrMemeIdx);
}

function newTxtBtnClicked() {
  var meme = gMemes[gCurrMemeIdx];
  meme.lines.push(_createText());
  gCurrLine = 0;
  gNumOfLines += 1;
  drawCanvas(gCurrMemeIdx);
}

//SWITCH LINES
function onSwitchLines() {
  if (gCurrLine >= gNumOfLines - 1) {
    gCurrLine = 0;
  } else {
    gCurrLine++;
  }
  drawCanvas(gCurrMemeIdx);
}

// Download Canvas
function downloadCanvas(elDownload) {
  var canvas = document.querySelector(".meme-canvas");
  elDownload.href = canvas.toDataURL();
  elDownload.download = "canvas-image.png";
}

//Toggle between grid and meme editor
// function toggleView() {
//   if (gDisplayedImgs < gImgs.length) {
//     renderImgs(gImgs);
//     gDisplayedImgs = 18;
//   } else {
//     document.querySelector(".meme-container").classList.toggle("hidden");
//     document.querySelector(".gallery").classList.toggle("hidden");
//     document.querySelector(".search-bar").classList.toggle("hidden");
//   }
//   document.querySelector(".search-input").value = "";
//   resetKeywords();
// }
function toggleView() {
  document.querySelector(".meme-container").classList.remove("hidden");
  document.querySelector(".gallery").classList.add("hidden");
  document.querySelector(".search-bar").classList.add("hidden");
  document.querySelector(".search-input").value = "";
  gDisplayedImgs = 18;
  resetKeywords();
}

function backToGallery() {
  console.log(gDisplayedImgs)
  //In case images were filtered by the search and gallery was pressed
  if (gDisplayedImgs < gImgs.length) {
    renderImgs(gImgs);
    gDisplayedImgs = 18;
  } else {
    document.querySelector(".meme-container").classList.add("hidden");
    document.querySelector(".gallery").classList.remove("hidden");
    document.querySelector(".search-bar").classList.remove("hidden");
    renderImgs(gImgs);
  }
  document.querySelector(".search-input").value = "";
  resetKeywords();
}

//Drag And Drop The TXT
var gDragging = false;
var startX;
var startY;

function myDown(e) {
  console.log(e);
  e.preventDefault();
  e.stopPropagation();
  console.log(e.target);
  var BB = gCanvas.getBoundingClientRect();
  var offsetX = BB.left;
  var offsetY = BB.top;
  var mx = parseInt(e.clientX - offsetX);
  var my = parseInt(e.clientY - offsetY);
  gDragging = false;
  for (var i = 0; i < currMeme.lines.length; i++) {
    var line = currMeme.lines[i];
    if (
      mx > line.x &&
      mx < line.x + line.width &&
      my < line.y &&
      my > line.y - line.size
    ) {
      gDragging = true;
      line.isDragging = true;
      console.log("yesss");
    }
  }
  startX = mx;
  startY = my;
}

function myUp(e) {
  e.preventDefault();
  e.stopPropagation();
  gDragging = false;
  for (var i = 0; i < currMeme.lines.length; i++) {
    currMeme.lines[i].isDragging = false;
  }
}

function myMove(e) {
  if (gDragging) {
    e.preventDefault();
    e.stopPropagation();

    var BB = gCanvas.getBoundingClientRect();
    var offsetX = BB.left;
    var offsetY = BB.top;
    var mx = parseInt(e.clientX - offsetX);
    var my = parseInt(e.clientY - offsetY);
    var dx = mx - startX;
    var dy = my - startY;
    for (var i = 0; i < currMeme.lines.length; i++) {
      var line = currMeme.lines[i];
      if (line.isDragging) {
        line.x += dx;
        line.y += dy;
      }
    }

    drawCanvas(gCurrMemeIdx);
    startX = mx;
    startY = my;
  }
}

