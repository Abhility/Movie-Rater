import { DataService } from './../data.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {

  users: any[];
  constructor(private dataService: DataService, private auth: AuthenticationService,
              private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataService.getusers().subscribe(res => {
       this.users = res;
    },
    err => {
       this.snackBar.open('Can\'t Authenticate!! Please Login again', 'OK');
       this.auth.logout('usertoken');
       this.router.navigate(['/login']);
    });
  }

}
