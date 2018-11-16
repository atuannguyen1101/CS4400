import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) {}

  // Variables declaration
  background = 'primary';
  routeLinks: any[];
  activeLinkIndex = -1;

  navLinks = [
    { path: 'login', label: 'Login' },
    { path: 'register', label: 'Registration' },
    { path: 'forgotpassword', label: 'Forgot Password' }
  ];

  ngOnInit(){}

  // getRoutesList() {
  //   this.route.data
  //   .map((data) => data[])
  //   .subscribe(
  //     (routeLinks) => {
  //       this.routeLinks = routeLinks;
  //     }
  //   );
  // }
}
