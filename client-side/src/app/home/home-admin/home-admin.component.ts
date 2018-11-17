import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor() { }

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

}
