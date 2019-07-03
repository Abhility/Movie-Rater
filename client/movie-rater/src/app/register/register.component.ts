import { MatSnackBar } from '@angular/material';
import {  Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private auth: AuthenticationService,
              private router: Router, private snackBar: MatSnackBar) {}

  registerForm = this.fb.group({
    userName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    email: ['', Validators.compose([
      Validators.required,
      Validators.email
    ])],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, this.passwordValidator);

  passwordValidator(passwords: FormGroup) {
    console.log(passwords.get('confirmPassword').value);
    if (passwords.get('password').value !== passwords.get('confirmPassword').value) {
      return { mismatch : true };
    }
    return null;
  }

  onSubmit() {

    const user = {
      userName : this.registerForm.get('userName').value,
      email : this.registerForm.get('email').value,
      password: btoa(this.registerForm.get('password').value)
  };
    this.auth.register(user).subscribe(
      res => {
        this.snackBar.open('You are succesfully registered', 'OK');
        this.router.navigate(['/home']);
      },
      err => {
        this.snackBar.open('Server error occured! Please Try again', 'OK');
      }
    );
  }

  ngOnInit() {
  }

}