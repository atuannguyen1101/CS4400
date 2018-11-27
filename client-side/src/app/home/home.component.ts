import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../_guards/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isLoggedIn$: Observable<boolean>;

  toggle : string = "true";

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.toggle = this.isLoggedIn$._isScalar.toString();
  }

}
