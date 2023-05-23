const mainContent = document.getElementById('main')
let wishlistFromLocalStorage = JSON.parse(localStorage.getItem('wishlist')) ? JSON.parse(localStorage.getItem('wishlist')) : [] 

function handleWishlist(index){
    const sweetAlertText = document.getElementById('sweet__alert-text')

    wishlistFromLocalStorage.splice(index, 1)
    
    localStorage.setItem('wishlist', JSON.stringify(wishlistFromLocalStorage))

    sweetAlertText.style.display = 'block'
    setTimeout(() => {
        sweetAlertText.style.display = 'none'
    }, 1500);

    render()

}

function render(){
    let moviesHtml
    if(wishlistFromLocalStorage.length > 0){
        moviesHtml = wishlistFromLocalStorage.map((movie, index) => {
            return `
                <div class="movie__card">
                    <img src="${movie.Poster}" class="movie__card-poster" />
                    <div class="movie__card-detail">
                        <div class="movie__card-rating">
                            <h3>${movie.Title}</h3>
                            <img src="images/star.png" />
                            <p>${movie.imdbRating}</p>
                        </div>
                        <div class="movie__card-stats">
                            <p>${movie.Runtime}</p>
                            <p>${movie.Genre}</p>
                            <div class="movie__card-watchlist" onClick="handleWishlist('${index}')">
                            <img src="images/minus.png" alt="Minus icon" />
                                Watchlist
                            </div>
                        </div>
                        <p class="movie__card-description">${movie.Plot}</p>
                    </div>
                </div>
            `
        })        
    }
    else{
        
        moviesHtml = `
            <div class="no-data-found" style="display: block; text-align:center;">
                <p>Your watchlist is looking a little empty...</p>
                <br>
                <a class="movie__card-watchlist" href="index.html" >
                    <img src="images/plus.png" alt="Plus icon" />
                    Let's add some movies!
                </a>
            </div>
        `
    }
    mainContent.innerHTML = moviesHtml
}

render()