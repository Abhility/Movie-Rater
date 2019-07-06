import { AuthenticationService } from './../services/authentication.service';
import { InteractionService } from './../services/interaction.service';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  constructor(private snackbar: MatSnackBar, private interact: InteractionService,
    private auth: AuthenticationService, private router: Router) { }
  addIcon = 'add_to_queue';
  removeIcon = 'library_add';
  add = true;
  @Input('genreData') data: any[];
  @Input() loading: boolean;

  addToWatchList(movieId: string) {
    if (!this.auth.getToken('usertoken')) {
      this.router.navigate(['/login']);
      return;
    }
    this.add = false;
    this.interact.addToWatchList(movieId).subscribe(
      res => {
        console.log(res);
        this.add = false;
        this.snackbar.open('Added to watchlist', 'OK', { duration: 2000 });
      },
      err => {
        alert('unauthorized');
        console.log(err);
      }
    );
  }

  removeFromWatchList(movieId: string) {
    if (!this.auth.getToken('usertoken')) {
      this.router.navigate(['/login']);
      return;
    }
    this.add = true;
    this.interact.removeFromWatchList(movieId).subscribe(
      res => {
        console.log(res);
        this.add = true;
        this.snackbar.open('Removed from watchlist', 'OK', { duration: 2000 });
      },
      err => {
        console.log(err);
        alert('unauthorized');
      }
    );
  }
  ngOnInit() {

  }

}
