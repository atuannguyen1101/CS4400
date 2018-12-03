import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-home-staff',
  templateUrl: './home-staff.component.html',
  styleUrls: ['./home-staff.component.css']
})
export class HomeStaffComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  direct(event) {
    let command = event.target.innerText;
    if (command == "Log out") {
      $("#headerBar").removeClass("hide");
      this.router.navigate(["login"]);
    } else if (command == "Search Animals") {
      this.router.navigate(['search-animal'])
    } else if (command == "View Shows") {
      this.router.navigate(['show-view-staff'])
    }
  }
}
