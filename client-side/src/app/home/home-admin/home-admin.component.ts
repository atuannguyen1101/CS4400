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
        this.router.navigate(['admin-view-visitors'], {queryParams: {type: 'Visitor'}});
        break;
      case 'View Show':
        this.router.navigate(['search-show'], {queryParams: {type: 'admin'}});
        break;
      case 'Add Show':
        this.router.navigate(['add-show']);
        break;
      case 'View Staff':
        this.router.navigate(['admin-view-visitors'], {queryParams: {type: 'Staff'}});
        break;
      case 'View Animals':
        this.router.navigate(['search-animal']);
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
