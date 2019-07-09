import { AuthenticationService } from "./services/authentication.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "movie-info";
  serverStatus = false;
  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    if (this.auth.getToken("token") == null) {
      this.auth.setup().subscribe(
        data => {
          this.auth.setToken("token", data.token);
          this.serverStatus = true;
        },
        err => {
          console.log(err);
          this.serverStatus = false;
        }
      );
    } else {
      this.serverStatus = true;
    }
  }
}
