import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { InteractionService } from "src/app/services/interaction.service";
import { DataService } from "src/app/services/data.service";
import { MatTabChangeEvent } from "@angular/material";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private interaction: InteractionService,
    private dataService: DataService
  ) {}

  userdata: any;
  watchlist: any[];
  movies: any[];
  upcoming: any[];
  initial: any;
  present: boolean;
  loading = true;
  list: any[];
  data: any[];
  nowPlaying: any[];

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    const tab = tabChangeEvent.index;
    console.log(tab);
    if (tab === 1) {
      this.data = this.nowPlaying;
    }
    if (tab === 2) {
      this.data = this.upcoming;
    }
  }
  ngOnInit(): void {
    this.getUserInfo();
    this.getWatchList();
    this.getNowPlaying();
    this.getUpcoming();
  }
  getUserInfo() {
    this.loading = true;
    this.auth.getUserInfo().subscribe(
      res => {
        this.userdata = res;
        this.initial = this.userdata.userName.substring(0, 1);
        this.loading = false;
      },
      err => {
        console.log(err);
        alert("unauthenticated");
      }
    );
  }

  getWatchList() {
    this.interaction.getWatchList().subscribe(
      res => {
        this.watchlist = res.data;
        this.present = res.present;
      },
      err => {
        console.log(err);
        alert("unauthenticated");
      }
    );
  }

  getUpcoming() {
    this.dataService.getUpcomingMovies().subscribe(
      res => {
        this.upcoming = res;
      },
      err => {
        console.log(err);
        alert("unauthenticated");
      }
    );
  }
  getNowPlaying() {
    this.dataService.getNowPlayingMovies().subscribe(
      res => {
        this.nowPlaying = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  // for (let i = 0; i < 5; i++) {
  //   this.dataService.getMovieWithMovieId(this.watchlist[i]).subscribe(
  //     data => {
  //       this.movies.push(data);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }
}
