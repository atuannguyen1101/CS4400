import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() {}

  // Variables declaration
  background = 'primary';
  navLinks = [
    { path: 'login', label: 'Login' },
    { path: 'register', label: 'Registration' },
    { path: 'forgotpassword', label: 'Forgot Password' }
  ];

  ngOnInit(){}
}
