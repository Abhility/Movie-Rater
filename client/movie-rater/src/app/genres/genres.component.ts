import { MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  constructor(private snackbar: MatSnackBar) { }
  watchlist = 'add_to_queue';
  @Input('genreData') data: any[];
  @Input() loading: boolean;

  toogleWatch() {
    if (this.watchlist === 'add_to_queue') {
      this.watchlist = 'library_add';
      this.snackbar.open('Added to watchlist', 'OK');
    } else {
      this.watchlist = 'add_to_queue';
      this.snackbar.open('Removed from watchlist', 'OK');
    }
  }
 ngOnInit() {

 }

}
