'use strict'

var gElCanvas
var gCtx
document.getElementById('meme-txt').addEventListener('input', (event) => {
    setLineTxt(event.target.value)
    renderMeme()
})


function onInit() {
    renderMeme()
    renderGallery()

}

function renderMeme() {

    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    const meme = getMeme()
    const img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
        meme.lines.forEach((line, idx) => {
            drawText(gCtx, line, idx === meme.selectedLineIdx)
        })
    }
}

function drawText(gCtx, line, isSelected) {
    gCtx.font = `${line.size}px Ariel`
    gCtx.fillStyle = line.color
    gCtx.fillText(line.txt, line.x, line.y)
    if (isSelected) {
        drewFrame(gCtx, line)
    }
}

function drewFrame(gCtx, line) {
    gCtx.strokeStyle = "white";
    gCtx.lineWidth = 2;

    // Measure the width of the text
    const textMetrics = gCtx.measureText(line.txt);
    const textWidth = textMetrics.width;

    // Use actual bounding box metrics for accurate vertical positioning
    const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

    // Calculate rectangle dimensions
    const x = line.x - textWidth /2; // Center the rectangle horizontally
    const y = line.y - textMetrics.actualBoundingBoxAscent; // Top of the text
    const height = textHeight; // Total height of the text

    gCtx.strokeRect(x, y, textWidth, height);
}


document.getElementById('color').addEventListener('input', (event) => {
    const selectedColor = event.target.value
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].color = selectedColor
    renderMeme()
})

document.getElementById('increase').addEventListener('click', (event) => {

    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].size += 2
    renderMeme()
})

document.getElementById('decrease').addEventListener('click', (event) => {

    const lineIdx = gMeme.selectedLineIdx
    if (gMeme.lines[lineIdx].size > 10) {
        gMeme.lines[lineIdx].size -= 2
        renderMeme()
    }
})

document.getElementById('canvas').addEventListener('click', onCanvasClick)

function onCanvasClick(ev) {
    const canvas = document.getElementById("canvas");
    const rect = canvas.getBoundingClientRect();
  
    // Get click coordinates relative to the canvas
    const clickX = ev.clientX - rect.left;
    const clickY = ev.clientY - rect.top;
  
    // Check if the click falls within any line's bounding box
    const clickedLineIdx = gMeme.lines.findIndex((line) => {
      const textMetrics = canvas.getContext("2d").measureText(line.txt);
      const textWidth = textMetrics.width;
  
      return (
        clickX >= line.x - textWidth / 2 &&
        clickX <= line.x + textWidth / 2 &&
        clickY >= line.y - line.size &&
        clickY <= line.y
      );
    });
  
    if (clickedLineIdx !== -1) {
      gMeme.selectedLineIdx = clickedLineIdx;
  
      const textInput = document.getElementById("meme-txt");
      console.log(textInput);
      textInput.value = gMeme.lines[clickedLineIdx].txt;
  
      renderMeme();
    }
  }


