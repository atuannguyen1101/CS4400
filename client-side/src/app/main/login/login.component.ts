import { AuthService } from './../../_guards/auth.service';
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

  constructor(private router: Router, private httpClient: HttpClientService, private authService: AuthService) { }

  ngOnInit() {}

  // Handle for invalid email
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  // Login clicked
  login() {
    const user = {
      email: this.email,
      password: this.password
    }
    this.httpClient.post('/login', user).subscribe((data) => {
      console.log(data);
      if (data.message == "success") {
        // this.authService.login(user); // Save to authServer to keep token
        // this.router.navigate(['home-view'])
        this.httpClient.get('/api/data').subscribe((data) => {
          console.log(data)
        })
      }
    })
    // this.router.navigate([''])
  }

  // Forgot Password clicked route to forgotPassword file
  forgotPass() {
    this.router.navigate(['forgotpassword'])
  }
}
