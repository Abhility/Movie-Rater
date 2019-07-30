import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css']
})
export class TopMoviesComponent implements OnInit {
  loading = true;
  movies: any[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loading = true;
    this.dataService.getTopRatedMovies().subscribe(
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
