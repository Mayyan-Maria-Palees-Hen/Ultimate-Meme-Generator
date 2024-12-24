'use strict'

function onInit() {

    // Render the gallery initially
    renderGallery()
  
    // Show the gallery section by default
    const gallery = document.getElementById("gallery-controller")
    const editor = document.getElementById("edit-container")
    // const backToGalleryBtn = document.getElementById("back-to-gallery-btn")
  
    // Display gallery initially
    gallery.classList.add("active")
  
    // backToGalleryBtn.addEventListener("click", () => {
    //   resetMeme()
    //   editor.classList.remove("active") // Hide editor
    //   gallery.classList.add("active") // Show gallery
//   })
  }