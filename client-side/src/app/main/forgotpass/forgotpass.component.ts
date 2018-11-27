import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['../main.component.css']
})
export class ForgotpassComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  // Initlize instance variables
  email: string = '';
  password: string = '';
  verifypassword: string = '';

  // Handle for invalid email
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  // Reset password
  resetPassword() {
    var newData = {
      email: this.email,
      password: this.password,
      verifypassword: this.verifypassword
    }
    // TODO Reset the password
  }
}
