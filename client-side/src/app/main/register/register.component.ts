import { Component, OnInit } from '@angular/core';
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

  constructor(private httpClient: HttpClientService) { }

  ngOnInit() {}

  // Variables declaration
  usersTypes: {} = [
    {'value' : 'Visitor'},
    {'value' : 'Staff'},
    {'value' : 'Admin'}
  ];

  // Handle for invalid email
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  usernameInput(event) {
    this.username = event.target.value;
  }

  passwordInput(event) {
    this.password = event.target.value;
  }

  verifyPasswordInput(event) {
    this.verifyPassword = event.target.value;
  }

  emailInput(event) {
    this.email = event.target.value;
  }

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
      console.log(data);
    })
  }
}
