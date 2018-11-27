import { AuthService } from './../../_guards/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClientService } from '../../http-client.service';
import { Router } from '@angular/router';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../main.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  password: string = '';
  verifyPassword: string = '';
  email: string = '';
  type: string = '';

  constructor(private httpClient: HttpClientService,
    private router: Router, private authService: AuthService) { }

  ngOnInit() {}

  // Variables declaration
  usersTypes: {} = [
    {'value' : 'Visitor'},
    {'value' : 'Staff'}
  ];

  // Handle for invalid email
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  // User type toggle event click
  toggleClicked(event) {
    this.type = event;
  }

  // Register clicked
  register() {
    // TODO
    let account = {
      username: this.username,
      password: this.password,
      email: this.email,
      type: this.type
    }
    this.httpClient.post('/register', account).subscribe((data) => {
      if (data.message == "success") {
        // Save to authServer to keep token
        this.authService.login({
          email: this.email,
          password: this.password
        });
      }
    })
  }
}
