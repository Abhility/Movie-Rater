import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private auth: AuthenticationService, private interaction: InteractionService, private dataService: DataService) { }
  userdata: any;
  watchlist: any[];
  movies: any[];
  ngOnInit() {
    this.auth.getUserInfo().subscribe(
      res => {
        this.userdata = res;
      },
      err => {
        console.log(err);
        alert('unauthenticated');
      });
    this.interaction.getWatchList().subscribe(
       res => {
       this.watchlist = res;
      },
      err => {
        console.log(err);
        alert('unauthenticated');
      });
    for (let i = 0; i < 5; i++) {
        this.dataService.getMovieWithMovieId(this.watchlist[i]).subscribe(
          data => {
            this.movies.push(data);
          },
          err => {
            console.log(err);
          }
        );
      }
  }
}
