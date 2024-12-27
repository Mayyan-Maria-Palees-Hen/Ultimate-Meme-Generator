function saveMemeToStorage(meme) {
    let memes = loadFromStorage();

    try {
        memes.push(meme);
        localStorage.setItem('memes', JSON.stringify(memes));
    } catch (e) {
        if (isQuotaExceeded(e)) {
            console.warn('LocalStorage is full. Clearing "memes" from storage.');
            localStorage.removeItem('memes');
        } else {
            console.error('An error occurred while saving to LocalStorage:', e);
 }
}
}

function isQuotaExceeded(error) {
    return (
        error instanceof DOMException &&
        (error.code === 22 || error.code === 1014 || error.name === 'QuotaExceededError')
);
}

function loadFromStorage() {
    return JSON.parse(localStorage.getItem('memes'))|| []
}