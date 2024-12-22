'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Add Text Here',
            size: 20,
            color: 'white'
        }
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
