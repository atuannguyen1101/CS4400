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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
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

  constructor(private httpClient: HttpClientService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.search.data.userType = data.type;
    })
  }

  searchClicked() {
    this.tableDisplay = true;
    this.httpClient.post('/userSearch', this.search).subscribe(res => {
      this.dataSource = new MatTableDataSource<any>(res.data);
    });
  }

}
