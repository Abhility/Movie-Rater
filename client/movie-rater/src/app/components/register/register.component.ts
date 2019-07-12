import { MatSnackBar, ErrorStateMatcher } from "@angular/material";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { PasswordError } from "./error";
import { AuthenticationService } from "src/app/services/authentication.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  passwordError = new PasswordError();
  registerForm = this.fb.group(
    {
      userName: ["", [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: [""]
    },
    { validator: this.passwordValidator }
  );

  passwordValidator(control: AbstractControl) {
    const password = control.get("password");
    const confirmPassword = control.get("confirmPassword");
    if (password.pristine || confirmPassword.pristine) {
      return null;
    }
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { mismatch: true };
    }
    return null;
  }
  onSubmit() {
    const user = {
      userName: this.registerForm.get("userName").value,
      email: this.registerForm.get("email").value,
      password: btoa(this.registerForm.get("password").value)
    };
    this.auth.register(user).subscribe(
      res => {
        this.snackBar.open("You are succesfully registered", "OK", {
          duration: 2000
        });
        this.router.navigate(["/home"]);
      },
      err => {
        this.snackBar.open("Server error occured! Please Try again", "OK", {
          duration: 2000
        });
      }
    );
  }

  ngOnInit() {}
}
