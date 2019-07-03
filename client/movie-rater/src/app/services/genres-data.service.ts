import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenresDataService {
  API_URL = 'http://localhost:5000/movies';
  constructor(private http: HttpClient) {
  }

  getData() {
    return this.http.get<any>(this.API_URL);
  }
}
