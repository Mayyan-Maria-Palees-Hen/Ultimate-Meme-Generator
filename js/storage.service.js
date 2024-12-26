function saveMemeToStorage(meme) {
    const memes = loadFromStorage()
   
    
    memes.push(meme)
    console.log(memes);
    // console.log(localStorage);
    localStorage.setItem('memes', JSON.stringify(memes))
    // console.log(localStorage);

}

function loadFromStorage() {
    return JSON.parse(localStorage.getItem('memes'))|| []
}