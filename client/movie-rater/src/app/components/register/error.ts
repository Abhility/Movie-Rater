import { FormControl, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class PasswordError implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | null) {
      return control.dirty && form.hasError('mismatch');
    }
 }
