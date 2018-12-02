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

  sortCriteria = {
    criteria: {
      name: false,
      numOfVisits: false,
      date: false
    },
    ascending: {
      name: false,
      numOfVisits: false,
      date: false
    }
  }

  constructor(private httpClient: HttpClientService) { }

  ngOnInit() {
  }

  searchClicked() {
    delete this.search['sortCriteria'];
    this.search.data.username = localStorage.getItem('username');
    this.tableDisplay = true;
    this.httpClient.post('/searchExhibitHistory', this.search).subscribe(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].date = moment(res.data[i].date_time).format('MM/DD/YYYY [at] hh:mm A');
      }
      this.dataSource = new MatTableDataSource<any>(res.data);
    })
  }
  
  sort(e) {
    let sortField = e.target.innerText.toLowerCase();
    if (sortField == "number of visits") {
      sortField = "numOfVisits";
    } else if (sortField == "date") {
      sortField = "date_time";
    }
    // console.log(sortField);
    for (var i of Object.keys(this.sortCriteria.criteria)) {
      if (i != sortField) {
        this.sortCriteria.criteria[i] = false;
        this.sortCriteria.ascending[i] = false;
      }
    }
    this.sortCriteria.criteria[sortField] = true;
    this.sortCriteria.ascending[sortField] = !this.sortCriteria.ascending[sortField];
    this.search['sortCriteria'] = this.sortCriteria;
    this.httpClient.post('/searchExhibitHistory', this.search).subscribe(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].date = moment(res.data[i].date_time).format('MM/DD/YYYY [at] hh:mm A');
      }
      this.dataSource = new MatTableDataSource<any>(res.data);
    });
  }
}
