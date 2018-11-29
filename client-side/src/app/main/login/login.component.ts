import { AuthService } from './../../_guards/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClientService } from '../../http-client.service';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

/** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../main.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });


  constructor(private router: Router, private httpClient: HttpClientService, private authService: AuthService) { }

  ngOnInit() {
  }

  // Login clicked
  login() {
    const user = {
      email: this.email,
      password: this.password
    }
    this.httpClient.post('/login', user).subscribe((res) => {
      console.log(res);
      if (res.message == "success") {
        // this.authService.login(user); // Save to authServer to keep token
        // this.router.navigate(['home-view'])
        this.errorMessage = '';
        this.httpClient.get('/api/data').subscribe((data) => {
          console.log(data)
        });
        localStorage.setItem("user_type", res.data.user_type);
        localStorage.setItem("username", res.data.username);

        this.router.navigate([`home-` + res.data.user_type.toLowerCase()]);
      } else {
        this.errorMessage = res.message;
      }
      console.log(this.errorMessage);
    })
  }

  // Forgot Password clicked route to forgotPassword file
  forgotPass() {
    this.router.navigate(['forgotpassword'])
  }

  test() {
    console.log("ABC");
  }
}
