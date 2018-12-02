import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { HttpClientService } from 'src/app/http-client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-visitors',
  templateUrl: './view-visitors.component.html',
  styleUrls: ['./view-visitors.component.css']
})
export class ViewVisitorsComponent implements OnInit {
  displayedColumns: string[] = ['username', 'email', 'check'];
  dataSource = new MatTableDataSource<any>([]);
  
  userType: string;
  tableDisplay = false;

  search = {
    criteria: {
      email: false,
      username: false
    },
    data: {
      email: "",
      username: "",
      userType: ""
    }
  }

  sortCriteria = {
    criteria: {
      email: false,
      username: false
    },
    ascending: {
      email: false,
      username: false
    }
  }

  constructor(private httpClient: HttpClientService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.search.data.userType = data.type;
    })
  }

  searchClicked() {
    delete this.search['sortCriteria'];
    this.tableDisplay = true;
    this.httpClient.post('/userSearch', this.search).subscribe(res => {
      this.dataSource = new MatTableDataSource<any>(res.data);
    });
  }
 
  sort(e) {
    let sortField = e.target.innerText.toLowerCase();
    if (sortField == "date") {
      sortField = "date_time"
    }
    for (var i of Object.keys(this.sortCriteria.criteria)) {
      if (i != sortField) {
        this.sortCriteria.criteria[i] = false;
        this.sortCriteria.ascending[i] = false;
      }
    }
    this.sortCriteria.criteria[sortField] = true;
    this.sortCriteria.ascending[sortField] = !this.sortCriteria.ascending[sortField];
    this.search['sortCriteria'] = this.sortCriteria;
    this.httpClient.post('/userSearch', this.search).subscribe(res => {
      this.dataSource = new MatTableDataSource<any>(res.data);
    });
  }
}
