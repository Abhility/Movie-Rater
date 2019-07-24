import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTabChangeEvent } from '@angular/material';
import { GenresDataService } from 'src/app/services/genres-data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  name: string;
  data: any[] = new Array();
  dataLoading = true;
  length: number;
  loadingWatchlist = true;
  watchlist: any[];
  @ViewChild('tab', { read: null, static: false }) tabGroup;

  constructor(
    private genreService: GenresDataService,
    private authService: AuthenticationService,
    private interact: InteractionService
  ) {}
  fetchData() {
    this.dataLoading = true;
    const genre = this.tabGroup._tabs.first.textLabel;
    this.genreService.getData(genre).subscribe(
      res => {
        this.data.push(...res);
        this.length = this.data.length;
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

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.data = [];
    const label = tabChangeEvent.tab.textLabel;
    this.dataLoading = true;
    this.genreService.getData(label).subscribe(
      res => {
        this.data.push(...res);
        this.length = this.data.length;
        this.dataLoading = false;
      },
      err => {
        console.log(err);
      }
    );
  }
  getWatchlist() {
    this.loadingWatchlist = true;
    this.interact.getWatchList().subscribe(
      res => {
        this.watchlist = res.data;
        this.loadingWatchlist = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.getWatchlist();
    } else {
      this.loadingWatchlist = false;
    }
  }
}
