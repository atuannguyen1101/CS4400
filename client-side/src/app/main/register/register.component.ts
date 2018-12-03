import { AuthService } from './../../_guards/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClientService } from '../../http-client.service';
import { Router } from '@angular/router';

declare const $:any;

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
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    verifyPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, {validators: this.checkPasswords});
  matcher = new MyErrorStateMatcher();

  constructor(private httpClient: HttpClientService,
    private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.type = "Visitor";
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.verifyPassword.value;

    return pass === confirmPass ? null : { notSame: true }     
  }


  // User type toggle event click
  toggleClicked(event) {
    this.type = event;
    // console.log(this.form.hasError('notSame'));
    // console.log(this.form.valid);
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
        $("#headerBar").addClass("hide");
        localStorage.setItem('userType', account.type);
        localStorage.setItem('username', account.username);
        this.router.navigate(['home-staff']);
        this.router.navigate([`home-` + account.type.toLowerCase()]);
      } else {
        this.errorMessage = data.message;
      }
    });
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
