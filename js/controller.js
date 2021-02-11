"use strict";

function init() {
  getImgUrls();
  createImgs();
  renderImgs(gImgs);
  createMemes();
}

function setFont(elFont) {
    gMemeFont = elFont.value
    drawCanvas(gCurrMemeIdx);
}
