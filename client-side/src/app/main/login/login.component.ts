import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClientService } from '../../http-client.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../main.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private httpClient: HttpClientService) { }

  ngOnInit() {}

  // Handle for invalid email
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  emailInput(event) {
    this.email = event.target.value;
  }

  passwordInput(event) {
    this.password = event.target.value;
  }

  // Login clicked
  login() {
    // TODO
    this.httpClient.post('/login', {
      email: this.email,
      password: this.password
    }).subscribe((data) => {
      console.log(data);
      if (data.message == "success") {
        this.router.navigate(['detail-view']);
      }
    })
    this.router.navigate([''])
  }

  // Forgot Password clicked route to forgotPassword file
  forgotPass() {
    this.router.navigate(['forgotpassword'])
  }
}
