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
  upcoming: any[];
  initial: any;
  present: boolean;
  loadingUser = true;
  loadingWatchList = true;
  loadingUpcoming = true;
  loadingNowPlaying = true;
  list: any[];
  data: any[];
  nowPlaying: any[];

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    const tab = tabChangeEvent.index;
    console.log(tab);
    if (tab === 0) {
      this.data = this.watchlist;
    }
    if (tab === 1) {
      this.data = this.nowPlaying;
    }
    if (tab === 2) {
      this.data = this.upcoming;
    }
    console.log("DATA:: " + this.data);
  }
  async ngOnInit() {
    this.getUserInfo();
    this.getNowPlaying();
    this.getUpcoming();
    this.getWatchList();
    this.data = this.watchlist;
  }
  getUserInfo() {
    this.loadingUser = true;
    this.auth.getUserInfo().subscribe(
      res => {
        this.userdata = res;
        this.initial = this.userdata.userName.substring(0, 1);
        this.loadingUser = false;
      },
      err => {
        console.log(err);
        alert("unauthenticated");
      }
    );
  }

  async getWatchList() {
    this.loadingWatchList = true;
    await this.interaction.getWatchList().subscribe(
      res => {
        this.watchlist = res.data;
        this.present = res.present;
        this.loadingWatchList = false;
      },
      err => {
        console.log(err);
        alert("unauthenticated");
      }
    );
  }

  getUpcoming() {
    this.loadingUpcoming = true;
    this.dataService.getUpcomingMovies().subscribe(
      res => {
        this.upcoming = res;
        this.loadingUpcoming = false;
      },
      err => {
        console.log(err);
        alert("unauthenticated");
      }
    );
  }

  getNowPlaying() {
    this.loadingNowPlaying = true;
    this.dataService.getNowPlayingMovies().subscribe(
      res => {
        this.nowPlaying = res;
        this.loadingNowPlaying = false;
      },
      err => {
        console.log(err);
      }
    );
  }
}
