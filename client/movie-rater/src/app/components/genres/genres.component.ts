import { MatSnackBar } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { InteractionService } from 'src/app/services/interaction.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  constructor(
    private snackbar: MatSnackBar,
    private interact: InteractionService,
    private auth: AuthenticationService,
    private router: Router
  ) {}
  addIcon = 'add_to_queue';
  removeIcon = 'library_add';
  @Input('genreData') data: any;
  @Input() loading: boolean;
  @Input() watchlist: any[];
  list: boolean[];
  addToWatchList(movieId: string, index: number) {
    if (!this.auth.getToken('usertoken')) {
      this.router.navigate(['/login']);
      return;
    }
    this.interact.addToWatchList(movieId).subscribe(
      res => {
        this.list[index] = false;
        this.snackbar.open('Added to watchlist', 'OK', { duration: 2000 });
      },
      err => {
        alert('unauthorized');
        console.log(err);
      }
    );
  }

  removeFromWatchList(movieId: string, index: number) {
    if (!this.auth.getToken('usertoken')) {
      this.router.navigate(['/login']);
      return;
    }
    this.interact.removeFromWatchList(movieId).subscribe(
      res => {
        this.list[index] = true;
        this.snackbar.open('Removed from watchlist', 'OK', { duration: 2000 });
      },
      err => {
        console.log(err);
        alert('unauthorized');
      }
    );
  }

  ngOnInit() {
    this.list = new Array(this.data.length);
    this.list.fill(true);
    if (this.auth.isLoggedIn()) {
      for (const watch of this.watchlist) {
        for (const [j, movie] of this.data.entries()) {
          if (movie.id === watch.id) {
            this.list[j] = false;
          }
        }
      }
    }
  }
  getValue(index) {
    return this.list[index];
  }
}
