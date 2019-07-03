import { GenresDataService } from './../services/genres-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css']
})
export class TopMoviesComponent implements OnInit {
  link = 'https://i.ytimg.com/vi/RnCpVUjJgeI/maxresdefault.jpg';
  movies: any[];

  constructor(private genreService: GenresDataService) { }

  ngOnInit() {
    this.genreService.getData().subscribe(res => {
      this.movies = res;
      console.log(this.movies);
   }, err => {
      console.log(err);
   });
  }

}
