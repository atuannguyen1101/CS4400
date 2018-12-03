import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { HttpClientService } from '../http-client.service';

declare const moment: any;

@Component({
  selector: 'app-show-view',
  templateUrl: './show-view.component.html',
  styleUrls: ['./show-view.component.css']
})
export class ShowViewComponent implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'exhibit'];
  dataSource = new MatTableDataSource<any>([]);

  search = {
    criteria: {
      host: true
    }, 
    data: {
      host: ""
    }
  }

  sortCriteria = {
    criteria: {
      name: false,
      date: false,
      exhibit: false
    },
    ascending: {
      name: false,
      date: false,
      exhibit: false
    }
  }

  constructor(private httpClient: HttpClientService) { }

  ngOnInit() {
    delete this.search['sortCriteria'];
    this.search.data.host = localStorage.getItem('username');
    this.httpClient.post('/searchShow', this.search).subscribe(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].date = moment(res.data[i].date_time).format('MM/DD/YYYY [at] hh:mm A');
        res.data[i].logged = false;
      }
      this.dataSource = new MatTableDataSource<any>(res.data);
    });
  }

  sort(e) {
    let sortField = e.target.innerText.toLowerCase();
    if (sortField == "date") {
      sortField = "date_time";
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
    this.httpClient.post('/searchShow', this.search).subscribe(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].date = moment(res.data[i].date_time).format('MM/DD/YYYY [at] hh:mm A');
        res.data[i].logged = false;
      }
      this.dataSource = new MatTableDataSource<any>(res.data);
    })
  }

}

