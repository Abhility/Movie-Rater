import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  API_URL = 'http://localhost:5000/movie-info';

  constructor(private http: HttpClient) { }

  addToWatchList(movieId: string) {
     return this.http.post(this.API_URL + '/addtowatchlist', {movieId});
  }

  removeFromWatchList(movieId: string) {
    return this.http.delete(this.API_URL + `/removefromwatchlist/${movieId}`);
  }
}
