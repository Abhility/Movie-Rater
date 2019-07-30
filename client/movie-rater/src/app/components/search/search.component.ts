import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  movies: any[];
  empty = false;
  loading = true;
  blank = false;
  spinner = false;
  loadingWatchlist = true;
  watchlist: any[];
  constructor(
    private dataService: DataService,
    private auth: AuthenticationService,
    private interact: InteractionService
  ) {}

  search(name: any) {
    this.spinner = true;
    if (name.trim().length === 0) {
      this.blank = true;
      this.empty = false;
      this.spinner = false;
      return;
    }
    this.blank = false;
    this.loading = true;
    this.empty = false;
    this.dataService.searchMovie(name).subscribe(
      res => {
        this.movies = res;
        if (this.movies.length === 0) {
          this.empty = true;
        }
        this.loading = false;
        this.spinner = false;
      },
      err => {
        console.log(err);
        this.loading = false;
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
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.getWatchlist();
    } else {
      this.loadingWatchlist = false;
    }
  }
}
