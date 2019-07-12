import { logging } from "protractor";
import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-crousel",
  templateUrl: "./crousel.component.html",
  styleUrls: ["./crousel.component.css"]
})
export class CrouselComponent implements OnInit {
  movies: any[];
  constructor(private dataService: DataService) {}
  loading = true;
  ngOnInit() {
    this.dataService.trending().subscribe(
      res => {
        this.movies = res;
        this.loading = false;
      },
      err => {
        console.log(err);
      }
    );
  }
}
