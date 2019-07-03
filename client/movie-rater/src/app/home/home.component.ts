import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GenresDataService } from '../services/genres-data.service';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  name: string;
  data: any[];
  dataLoading = true;
  @ViewChild('tab', {read: null, static: true}) tabGroup;

  fetchData() {
    this.genreService.getData().subscribe(res => {
      this.data = res;
      this.dataLoading = false;
   }, err => {
      console.log(err);
   });
  }
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  async ngAfterViewInit() {
      await this.delay(4000);
      this.fetchData();
  }

  constructor(private genreService: GenresDataService, private authService: AuthenticationService) {
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.genreService.getData().subscribe(res => {
      this.data = res;
   }, err => {
      console.log(err);
   });
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  ngOnInit() {

  }
}
