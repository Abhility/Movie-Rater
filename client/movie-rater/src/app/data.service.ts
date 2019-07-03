import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  API_URL = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  getusers() {
    return this.http.get<any>(this.API_URL + '/users');
  }
}
