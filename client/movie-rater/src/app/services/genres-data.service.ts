import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenresDataService {
  API_URL = '/movie-info';
  // API_URL = 'http://localhost:5000/movie-info';
  constructor(private http: HttpClient) {}

  getData(genre: string) {
    const headers = new HttpHeaders({ genre });
    return this.http.get<any>(this.API_URL + '/genre', { headers });
  }
}
