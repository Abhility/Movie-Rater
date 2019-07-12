import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";

import { MatTabChangeEvent } from "@angular/material";
import { GenresDataService } from "src/app/services/genres-data.service";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, AfterViewInit {
  name: string;
  data: any[];
  dataLoading = true;
  @ViewChild("tab", { read: null, static: true }) tabGroup;

  fetchData() {
    this.dataLoading = true;
    const genre = this.tabGroup._tabs.first.textLabel;
    this.genreService.getData(genre).subscribe(
      res => {
        this.data = res;
        this.dataLoading = false;
      },
      err => {
        console.log(err);
      }
    );
  }
  ngAfterViewInit() {
    this.fetchData();
  }

  constructor(
    private genreService: GenresDataService,
    private authService: AuthenticationService
  ) {}

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    const label = tabChangeEvent.tab.textLabel;
    this.dataLoading = true;
    this.genreService.getData(label).subscribe(
      res => {
        this.data = res;
        this.dataLoading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  ngOnInit() {}
}
