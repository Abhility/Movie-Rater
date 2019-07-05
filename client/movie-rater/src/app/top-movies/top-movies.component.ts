import { GenresDataService } from './../services/genres-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css']
})
export class TopMoviesComponent implements OnInit {
  loading = true;
  movies: any[];

  constructor(private genreService: GenresDataService) { }

  ngOnInit() {
    this.loading = true;
    this.genreService.getData('Action').subscribe(res => {
      this.movies = res;
      this.loading = false;
      console.log(this.movies);
   }, err => {
      console.log(err);
   });
  }

}
