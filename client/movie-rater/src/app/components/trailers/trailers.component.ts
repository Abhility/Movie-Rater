import { MatSnackBar } from "@angular/material";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-trailers",
  templateUrl: "./trailers.component.html",
  styleUrls: ["./trailers.component.css"]
})
export class TrailersComponent implements OnInit {
  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.snackBar.open(
      "Good network connection is needed for this feature",
      "OK"
    );
  }
}
