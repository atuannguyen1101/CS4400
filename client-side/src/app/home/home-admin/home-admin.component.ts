import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  titleList: String[] = [
    'View Visitors',
    'View Show',
    'Add Show'
  ];

  titleList2: String[] = [
    'View Staff',
    'View Animals',
    'Log out'
  ];

  direct(event) {
    let command = event.target.innerText;
    if (command == "Add Show") {
      this.router.navigate(["add-show"]);
    } else if (command == "Log out") {
      this.router.navigate(["login"]);
    }
  }
}
