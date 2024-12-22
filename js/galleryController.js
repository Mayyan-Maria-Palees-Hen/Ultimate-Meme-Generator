'use strict'

function renderGallery() {
    var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] }]
    const gallery = document.getElementById('gallery-controller')
    gImgs.forEach((img) => {
        const imgEl = document.createElement('img')
        imgEl.src = img.url
        imgEl.onclick = ()=> onImgSelect(img.id)
        gallery.appendChild(imgEl)
    }
    )
}

function onImgSelect(id){
    setImg(id) 
    renderMeme()
}
