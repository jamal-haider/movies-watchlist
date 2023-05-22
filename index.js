let moviesArray = []
let moviesHtml = ''
const apiKey = "4d0185a7"
const textInp = document.getElementById('text-inp')
const searchMoviesForm = document.getElementById('search-movies')
const mainContent = document.getElementById('main')

searchMoviesForm.addEventListener('submit', fetchMovies)


async function fetchMovieDetail(id){
    const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
    const movie = await res.json()
    
    mainContent.innerHTML += `
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
                                <p><div class="watchlist-plus">+</div>Watchlist</p>
                            </div>
                            <p class="description">${movie.Plot}</p>
                        </div>
                    </div>
                `
    
}

function fetchMovies(e){
    e.preventDefault()
    
    const searchText = textInp.value
    if(searchText){
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchText}`)
            .then(res => res.json())
            .then(data => {
                
                const tempMoviesArray = data.Search.slice(0, 3)
                mainContent.innerHTML = ""
                
                tempMoviesArray.map(movie => {
                    fetchMovieDetail(movie.imdbID)
                })
            })
    }
}