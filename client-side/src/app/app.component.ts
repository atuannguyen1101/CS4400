import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {}

  // Life cycle auto redirect page to main index
  ngOnInit() {
    // this.router.navigate(['index'])
  }
}
