import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_guards/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor( private authService: AuthService ) {}

  isLoggedIn$: Observable<boolean>;

  toggle : string = "true";

  ngOnInit(){
    this.isLoggedIn$ = this.authService.isLoggedIn;
    console.log(this.isLoggedIn$);
    this.toggle = this.isLoggedIn$._isScalar.toString();
  }
}
