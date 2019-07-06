import { DataService } from '../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  movies: any[];
  empty = false;
  loading = false;
  blank = false;
  constructor(private dataService: DataService) { }

  search(name: any) {
    if (name.trim().length === 0) {
       this.blank = true;
       return;
    }
    this.blank = false;
    this.loading = true;
    this. empty = false;
    this.dataService.searchMovie(name).subscribe(
      res => {
         this.movies = res;
         if (this.movies.length === 0) {
             this.empty = true;
         }
         this.loading = false;
      },
      err => {
          console.log(err);
          this.loading = false;
      }
    );
  }

  ngOnInit() {

  }

}
