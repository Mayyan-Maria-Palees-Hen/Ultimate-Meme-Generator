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
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line, idx) => {
            drawText(gCtx, line, idx === meme.selectedLineIdx)
        })
    }
}

function drawText(gCtx, line, isSelected) {
    gCtx.font = `${line.size}px ${line.font || 'Ariel'}`
    // console.log(gCtx.font)
    gCtx.fillStyle = line.color
    gCtx.textAlign = line.align
    gCtx.fillText(line.txt, line.x, line.y)
    gCtx.strokeStyle = line.borderColor
    gCtx.strokeText(line.txt, line.x, line.y)
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
    var rectX
    if (line.align === 'center') {
        rectX = line.x - textWidth / 2
    } else if (line.align === 'left') {
        rectX = line.x
    } else if (line.align === 'right') {
        rectX = line.x - textWidth
    }

    // Use actual bounding box metrics for accurate vertical positioning
    // const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

    // Calculate rectangle dimensions
    // const x = line.x - textWidth / 2; // Center the rectangle horizontally
    // const y = line.y - textMetrics.actualBoundingBoxAscent; // Top of the text
    const rectY = line.y - line.size * 0.8
    const height = line.size // Total height of the text

    gCtx.strokeRect(rectX, rectY, textWidth, height)
}


document.getElementById('color').addEventListener('input', (event) => {
    const selectedColor = event.target.value
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].color = selectedColor
    renderMeme()
})

document.getElementById('color-stroke').addEventListener('input', (event) => {
    const selectedColor = event.target.value
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].borderColor = selectedColor
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
    const canvas = document.getElementById("canvas")
    const rect = canvas.getBoundingClientRect()

    // Get click coordinates relative to the canvas
    const clickX = ev.clientX - rect.left;
    const clickY = ev.clientY - rect.top;

    // Check if the click falls within any line's bounding box
    const clickedLineIdx = gMeme.lines.findIndex((line) => {
        const textMetrics = canvas.getContext("2d").measureText(line.txt)
        const textWidth = textMetrics.width;

        var rectX
        if (line.align === 'center') {
            rectX = line.x - textWidth / 2
        } else if (line.align === 'left') {
            rectX = line.x
        } else if (line.align === 'right') {
            rectX = line.x - textWidth
        }

        return (
            clickX >= rectX &&
            clickX <= rectX + textWidth &&
            clickY >= line.y - line.size * 0.8 &&
            clickY <= line.y
        )
    })

    if (clickedLineIdx !== -1) {
        const line = gMeme.lines[clickedLineIdx]
        drewFrame(gCtx, line)
        gMeme.selectedLineIdx = clickedLineIdx

        const textInput = document.getElementById("meme-txt")
        // console.log(textInput);
        textInput.value = gMeme.lines[clickedLineIdx].txt

        renderMeme()
    }
}

document.getElementById('font-family').addEventListener('change', (event) => {
    const selectedFont = event.target.value
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    selectedLine.font = selectedFont
    // console.log(selectedFont)
    renderMeme()
})

document.getElementById('align-left').addEventListener('click', () => {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    selectedLine.align = 'left'

    renderMeme()
})

document.getElementById('align-right').addEventListener('click', () => {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    selectedLine.align = 'right'

    renderMeme()
})

document.getElementById('align-center').addEventListener('click', () => {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    selectedLine.align = 'center'

    renderMeme()
})

document.addEventListener('keydown', (event) => {

    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    if (event.key === 'ArrowUp') {
        selectedLine.y -= 10
        renderMeme()
    } else if (event.key === 'ArrowDown') {
        selectedLine.y += 10
        renderMeme()
        event.preventDefault()
    }
})

document.getElementById('delete-lign').addEventListener('click', () => {
    const selectedLineIdx = gMeme.selectedLineIdx
    if (gMeme.lines.length > 1) {
        gMeme.lines.splice(selectedLineIdx, 1)
        gMeme.selectedLineIdx = gMeme.lines.length - 1
        renderMeme()
    }
})

document.getElementById('save-meme').addEventListener('click', () => {
    const dataUrl = gElCanvas.toDataURL()
    console.log(dataUrl);

    const savedMeme = { id: Date.now(), imgData: dataUrl, lines: [...gMeme.lines] }
    saveMemeToStorage(savedMeme)
    alert('meme saved!')
})

function showSavedMemes() {
    document.getElementById("gallery-controller").style.display = "none";
    document.getElementById("editor-controller").style.display = "none";
    console.log(  document.getElementById("saved-memes-container"));
    
    document.getElementById("saved-memes-container").style.display = "grid";
    
    const savedMemes = getSavedMenes(); // Fetch saved memes from memeService
    const savedMemesContainer = document.getElementById("saved-memes-container");
  
    // Clear previous content
    savedMemesContainer.innerHTML = "";
  
    // Display saved memes
    savedMemes.forEach((meme) => {
      const memeDiv = document.createElement("div");
      memeDiv.classList.add("saved-meme");
  
      const memeImg = document.createElement("img");
      memeImg.src = meme.imgUrl; // Assuming meme has an imgUrl property
      memeDiv.appendChild(memeImg);
  
      savedMemesContainer.appendChild(memeDiv);
    });
  }
  

function onSuccess(uploadedImgUrl) {
    // Handle some special characters
    const url = encodeURIComponent(uploadedImgUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}

function shareOnFacebook() {
    const uploadedImgUrl = gElCanvas.toDataURL()
    onSuccess(uploadedImgUrl)
}







