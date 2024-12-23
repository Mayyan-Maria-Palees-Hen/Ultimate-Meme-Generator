'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Add Text Here',
            size: 20,
            color: 'white',
            x: 250, y: 50,
        },
        
    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function downloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    // console.log('data', data) 

    elLink.href = dataUrl
    // Set a name for the downloaded file
    elLink.download = 'my-img'
}

function onAddLine() {
    const newY = gMeme.lines.length * 50 + 50
    gMeme.lines.push({ txt: 'Add Text Here', size: 20, color: 'white', x: 250, y: newY })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    renderMeme()
}

function onSwitch() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length//chek next aline
    renderMeme()
}
