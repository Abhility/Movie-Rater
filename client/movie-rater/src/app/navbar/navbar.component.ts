import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthenticationService, private snackbar: MatSnackBar, private router: Router) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout('usertoken');
    const snackRef = this.snackbar.open('Logout successfull', 'OK');
    snackRef.afterDismissed().subscribe(() => {
        this.router.navigate(['/home']);
    });
  }
  ngOnInit() {
  }

}
