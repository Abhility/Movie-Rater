import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  API_URL = "/movie-info";
  // API_URL = "http://localhost:5000/movie-info";
  constructor(private http: HttpClient, private router: Router) {}

  setup() {
    return this.http.get<any>(this.API_URL + "/setup");
  }

  register(userData: any) {
    return this.http.post<any>(this.API_URL + "/register", userData);
  }

  login(userData: any) {
    return this.http.post<any>(this.API_URL + "/login", userData);
  }

  getToken(name: string) {
    return localStorage.getItem(name);
  }

  setToken(name: string, token: string) {
    localStorage.setItem(name, token);
  }

  logout(name: string) {
    localStorage.removeItem(name);
    this.router.navigate(["/home"]);
  }

  isLoggedIn() {
    return !!localStorage.getItem("usertoken");
  }

  getUserInfo() {
    return this.http.get<any>(this.API_URL + "/user");
  }
}
