import { DataService } from 'src/app/services/data.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTabChangeEvent } from '@angular/material';
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
    private authService: AuthenticationService,
    private interact: InteractionService,
    private dataSerrvice: DataService
  ) {}
  fetchData(genre) {
    this.dataLoading = true;
    this.dataSerrvice.getGenreData(genre).subscribe(
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
    const genre = this.tabGroup._tabs.first.textLabel;
    this.fetchData(genre);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.data = [];
    const label = tabChangeEvent.tab.textLabel;
    this.fetchData(label);
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
