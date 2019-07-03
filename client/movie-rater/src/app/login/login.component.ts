import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthenticationService,
              private router: Router, private snackBar: MatSnackBar) {}

  loginForm = this.fb.group({
    email: ['', Validators.compose([
      Validators.required,
      Validators.email
    ])],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    const user = {
      email : this.loginForm.get('email').value,
      password: btoa(this.loginForm.get('password').value)
  };
    this.auth.login(user).subscribe(
      res => {
        this.auth.setToken('usertoken', res.usertoken);
        this.snackBar.open('You are successfully logged In', 'OK');
        this.router.navigate(['/top-movies']);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 403) {
            this.loginForm.controls.password.setValue('');
            this.snackBar.open('Incorrect Password', 'OK');
            return;
           }
          if (err.status === 404) {
            this.loginForm.controls.email.setValue('');
            this.loginForm.controls.password.setValue('');
            this.snackBar.open('Incorrect Email', 'OK');
            return;
          }
          this.snackBar.open('Server Error! Please Try again', 'OK');
         }
      }
    );
  }

  ngOnInit() {
  }

}
