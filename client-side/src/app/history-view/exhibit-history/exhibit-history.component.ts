import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { HttpClientService } from 'src/app/http-client.service';

declare const moment: any;

@Component({
  selector: 'app-exhibit-history',
  templateUrl: './exhibit-history.component.html',
  styleUrls: ['./exhibit-history.component.css']
})
export class ExhibitHistoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'time', 'numOfVisits'];
  dataSource = new MatTableDataSource<any>([]);
  tableDisplay = false;

  search = {
    criteria: {
      username: true,
      name: false,
      numOfVisits: false,
      date: false
    },
    data: {
      username: "",
      name: "",
      numMin: 0,
      numMax: 0,
      date: Date
    }
  }

  constructor(private httpClient: HttpClientService) { }

  ngOnInit() {
  }

  searchClicked() {
    this.search.data.username = localStorage.getItem('username');
    this.tableDisplay = true;
    this.httpClient.post('/searchExhibitHistory', this.search).subscribe(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].date = moment(res.data[i].date_time).format('MM/DD/YYYY [at] hh:mm A');
      }
      this.dataSource = new MatTableDataSource<any>(res.data);
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
