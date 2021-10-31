import http from "./httpService";

export function getMovies() {
  return http.get("/movies");
}
export function deleteMovie(movieId) {
  return http.delete("/movies" + "/" + movieId);
}

export function getMovie(movieId) {
  return http.get("/movies" + "/" + movieId);
}

export function saveMovie(movie) {
  if (movie._id) {
    const reqbody = { ...movie };
    delete reqbody._id;
    console.log(reqbody);
    return http.put("/movies" + "/" + movie._id, reqbody);
  }
  return http.post("/movies", movie);
}
