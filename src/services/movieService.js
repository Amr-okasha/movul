import R from "../services/httpServices"
import config from "../config.json"


export async function getMovies() {
    return await R.http({
        url: config.apiURL + "/movies"
    })
}

export async function getMovie(movieId) {
    return await R.http({
        url: config.apiURL + "/movies/" + movieId
    })
}

export async function saveMovie(movie) {
    if (movie._id) {
        const body = { ...movie }
        delete body._id;
        return await R.http({
            url: config.apiURL + "/movies" + movie._id,
            method: "PUT",
            data: body
        })
    } else {
        return await R.http({
            url: config.apiURL + "/movies",
            method: "POST",
            data: movie
        })
    }
}
export function deleteMovie(movieId) {
    return R.http({
        url: config.apiURL + "/movies/" + movieId,
        method: "DELETE"
    })
}