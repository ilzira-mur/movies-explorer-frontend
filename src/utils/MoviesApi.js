const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

class MoviesApi {

    constructor(options) {
        ({ baseUrl: this._baseUlr } = options);
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    }

    getMoviesCard() {
        return fetch(this._baseUlr, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
        },
        }).then(this._getResponse);
    };
}

const moviesApi = new MoviesApi({
    baseUrl: BASE_URL,
});

export default moviesApi;