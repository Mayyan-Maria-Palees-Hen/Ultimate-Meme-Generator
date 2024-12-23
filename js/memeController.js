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
        const line = meme.lines[meme.selectedLineIdx]
        gCtx.font = `${line.size}px Ariel`
        gCtx.fillStyle = line.color
        gCtx.fillText(line.txt, 50, 50)

    }

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



