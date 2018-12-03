import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-home-visitor',
  templateUrl: './home-visitor.component.html',
  styleUrls: ['./home-visitor.component.css']
})
export class HomeVisitorComponent implements OnInit {

  constructor(private router: Router) { }

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

  direct(event) {
    let command = event.target.innerText;
    switch(command) {
      case 'Search Exhibit':
        this.router.navigate(['search-exhibit']);
        break;
      case 'Search Show':
        this.router.navigate(['search-show'], {queryParams: {type: "search"}});
        break;
      case 'Search For Animal':
        this.router.navigate(['search-animal']);
        break;
      case 'View exibit history':
        this.router.navigate(['exhibit-history']);
        break;
      case 'View show history':
        this.router.navigate(['search-show'], {queryParams: {type: "history"}});
        break;
      case 'Log out':
        $("#headerBar").removeClass("hide");
        this.router.navigate(['login']);
        break;
      default:
        break;
    }
  }
}
