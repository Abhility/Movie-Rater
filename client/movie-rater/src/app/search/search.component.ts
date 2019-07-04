import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  movies: any[];
  available = false;
  empty = false;
  loading = false;
  constructor(private dataService: DataService) { }

  search(name: string) {
    console.log(name);
    this.loading = true;
    this.available = false
    this.dataService.searchMovie(name).subscribe(
      res => {
         this.movies = res;
         if (this.movies.length === 0) {
             this.empty = true;
         }
         this.loading = false;
         this.available = true;
      },
      err => {
          console.log(err);
          this.available = false;
      }
    );
  }

  ngOnInit() {

  }

}
