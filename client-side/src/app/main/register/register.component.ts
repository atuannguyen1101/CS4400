import { AuthService } from './../../_guards/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClientService } from '../../http-client.service';
import { Router } from '@angular/router';

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
  errorMessage: string = '';
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    verifyPassword: new FormControl('', Validators.required)
  })

  constructor(private httpClient: HttpClientService,
    private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.type = "Visitor";
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
      if (data.message == "success") {
        // Save to authServer to keep token
        this.authService.login({
          email: this.email,
          password: this.password
        });
      } else {
        this.errorMessage = data.message;
      }
    })
  }
}
