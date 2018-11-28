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
    'View Staff',
    'View Show',
    'View Animals',
    'Log out'
  ];

  titleList2: String[] = [
    'View Visitors',
    'Add Show',
    'Add Animals',
  ];

  direct(event) {
    let command = event.target.innerText;
    switch(command) {
      case 'View Visitors':
        this.router.navigate(['admin-view-visitor']);
        break;
      case 'View Show':
        this.router.navigate(['show-view']);
        break;
      case 'Add Show':
        this.router.navigate(['add-show']);
        break;
      case 'View Staff':
        this.router.navigate(['admin-view-staff']);
        break;
      case 'View Animals':
        this.router.navigate(['animal-detail']);
        break;
      case 'Log out':
        this.router.navigate(['login']);
        break;
      case 'Add Animals':
        this.router.navigate(['animal-detail-add']);
        break;
      default:
        break;
    }
  }
}
