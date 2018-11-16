import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-visitor',
  templateUrl: './home-visitor.component.html',
  styleUrls: ['./home-visitor.component.css']
})
export class HomeVisitorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  titleList: String[] = [
    'Search Exhibit',
    'Search Show',
    'Search For Animal'
  ];

  titleList2: String[] = [
    'View exibit history',
    'View show history',
    'Log out'
  ];
}
