"use strict";
var gImgObj;
var gCtx;
var gCurrMemeIdx;
var gCurrLine = 0;
var gNumOfLines = 2;
var gMemeFont = "impact"
var gMemes = [];
// var gMeme = [
//   {
//     selectedImgId: 0,
//     selectedLineIdx: 0,
//     lines: [
//       { txt: "Trump", size: 40, align: "left", color: "red", x: 200, y: 70 },
//       { txt: "Donald", size: 40, align: "left", color: "red", x: 200, y: 450 },
//     ],
//   },
//   {
//     selectedImgId: 1,
//     selectedLineIdx: 0,
//     lines: [
//       { txt: "Doggies", size: 40, align: "left", color: "red", x: 200, y: 70 },
//       { txt: "Cute", size: 40, align: "left", color: "red", x: 200, y: 450 },
//     ],
//   },
// ];

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
      { txt: "Text", size: 50, align: "left", color: "red", x: 200, y: 70 },
      {
        txt: "Text",
        size: 50,
        align: "left",
        color: "red",
        x: 200,
        y: 450,
      },
    ],
  };
  gImgId++;
  return meme;
}

//CANVAS CONTROL

function initCanvas(imgId) {
  toggleView();
  gCurrMemeIdx = imgId;
  var canvas = document.querySelector(".meme-canvas");
  gCtx = canvas.getContext("2d");

  gImgObj = new Image();
  gImgObj.src = getImgSrc(gCurrMemeIdx);

  gImgObj.onload = function () {
    canvas.width = gImgObj.width;
    console.log("width ", canvas.width);
    canvas.height = gImgObj.height;
    console.log("height ", canvas.height);
    // gMeme.lines[0].txt = gImgObj.height - 70;

    drawCanvas(gCurrMemeIdx);
  };
}

function drawImageScaled(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
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

function drawCanvas(imgId) {
  var lineNum = 0;
  gCtx.drawImage(gImgObj, 0, 0);
  var meme = gMemes.find(function (meme) {
    return imgId === meme.selectedImgId;
  });
  meme.lines.forEach(function (txt) {
    if (lineNum === gCurrLine) {
      drawTxt(txt, true);
    } else {
      drawTxt(txt);
    }
    lineNum++;
  });
}

function drawTxt(txt, outline) {
  txt.fontFamily = gMemeFont
  if (outline) {
    gCtx.font = txt.size + "px" + " " + txt.fontFamily;
    gCtx.textAlign = txt.align;
    gCtx.fillStyle = txt.color;
    gCtx.strokeStyle = "white";
    gCtx.lineWidth = 1;
    gCtx.fillText(txt.txt, txt.x, txt.y);
    gCtx.strokeText(txt.txt, txt.x, txt.y);
  } else {
    gCtx.font = txt.size + "px" + " " + txt.fontFamily;
    gCtx.textAlign = txt.align;
    gCtx.fillStyle = txt.color;
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
  console.log(meme.lines);
  console.log(gCurrLine);
  meme.lines[gCurrLine].txt = value;
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
  drawCanvas(gCurrMemeIdx);
}

function newTxtBtnClicked() {
  var meme = gMemes[gCurrMemeIdx];
  meme.lines.push(_createText());
  gCurrLine = 0;
  gNumOfLines += 1;
  drawCanvas(gCurrMemeIdx);
}

function _createText() {
  return {
    txt: "New Text",
    size: 40,
    align: "left",
    color: "red",
    x: 150,
    y: 250,
  };
}

//SWITCH LINES
function onSwitchLines() {
  if (gCurrLine >= gNumOfLines - 1) {
    gCurrLine = 0;
  } else {
    gCurrLine++;
  }
  console.log(gCurrLine);
  drawCanvas(gCurrMemeIdx);
}

//Toggle between grid and meme editor
function toggleView() {
  document.querySelector(".meme-container").classList.toggle("hidden");
  document.querySelector(".gallery").classList.toggle("hidden");
}
