'use strict'

function renderGallery() {
    var gImgs = [
        { id: 1, url: 'img/1.jpg', keywords: ['funny', 'guy'] },
        { id: 2, url: 'img/2.jpg', keywords: ['cute', 'dog'] },
        { id: 3, url: 'img/3.jpg', keywords: ['sleeping', 'dog-baby'] },
        { id: 4, url: 'img/4.jpg', keywords: ['smile', 'man'] },
        { id: 5, url: 'img/5.jpg', keywords: ['cute', 'dog'] },
        { id: 6, url: 'img/6.jpg', keywords: ['sleeping', 'cat'] },
        { id: 7, url: 'img/7.jpg', keywords: ['happy', 'women'] },
        { id: 8, url: 'img/8.jpg', keywords: ['cute', 'baby'] },
        { id: 9, url: 'img/9.jpg', keywords: ['happy', 'man'] },
        { id: 10, url: 'img/10.jpg', keywords: ['serious', 'man'] },
    ]

    document.getElementById("editor-controller").style.display = "none"

    const gallery = document.getElementById('gallery-controller')
    gImgs.forEach((img) => {
        const imgEl = document.createElement('img')
        imgEl.src = img.url
        imgEl.onclick = () => onImgSelect(img.id)
        gallery.appendChild(imgEl)
    }
    )
}

function onImgSelect(id) {
    resetMeme()
    document.getElementById("gallery-controller").style.display = "none"
    document.getElementById("editor-controller").style.display = "grid"
    document.getElementById("saved-memes-controller").style.display = "none"
    setImg(id)
    renderMeme()
  }
//   saved-memes-controller
  

  function showGallery() {
    // Show gallery and hide editor by toggling the 'hidden' attribute
    document.getElementById("gallery-controller").style.display = "grid"
    document.getElementById("editor-controller").style.display = "none"
    document.getElementById("saved-memes-container").style.display = "none"
  }
  
  



