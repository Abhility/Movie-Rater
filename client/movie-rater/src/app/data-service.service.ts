import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  API_URL = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  getusers() {
    return this.http.get<any>(this.API_URL + '/users');
  }
}
