import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class DataService {
  API_URL = `http://localhost:5000/movie-info`;
  constructor(private http: HttpClient) {}

  searchMovie(name: string) {
    const headers = new HttpHeaders({ name });
    return this.http.get<any>(this.API_URL + `/search`, { headers });
  }

  trending() {
    return this.http.get<any>(this.API_URL + `/trending`);
  }

  getMovieWithMovieId(movieId: string) {
    return this.http.get<any>(this.API_URL + `/getmovie/${movieId}`);
  }

  getNowPlayingMovies() {
    return this.http.get<any>(this.API_URL + `/getmovies/now_playing`);
  }

  getUpcomingMovies() {
    return this.http.get<any>(this.API_URL + `/getmovies/upcoming`);
  }
}
