import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { HttpClientService } from 'src/app/http-client.service';
import { Router, ActivatedRoute } from '@angular/router';

declare const moment: any;

@Component({
  selector: 'app-search-show',
  templateUrl: './search-show.component.html',
  styleUrls: ['./search-show.component.css']
})
export class SearchShowComponent implements OnInit {
  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>([]);

  exhibitList: string[];
  tableDisplay = false;
  searchShowType: string = "search";

  search = {
    criteria: {
      name: false,
      date: false,
      exhibit: false
    },
    data: {
      username: localStorage.getItem('username'),
      name: "",
      exhibit: "",
      date: Date
    }
  }

  sortCriteria = {
    criteria: {
      name: false,
      date_time: false,
      exhibit: false
    },
    ascending: {
      name: false,
      date_time: false,
      exhibit: false
    }
  }
  constructor(private httpClient: HttpClientService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.searchShowType = data.type;
      if (this.searchShowType == 'history') {
        this.displayedColumns = ['name', 'exhibit', 'date'];
      } else if (this.searchShowType == 'search' || this.searchShowType == 'admin') {
        this.displayedColumns = ['name', 'exhibit', 'date', 'check'];
      }
    });
    this.httpClient.get('/exhibitList').subscribe(data => {
      this.exhibitList = data.data;
    });
  }

  searchClicked() {
    delete this.search['sortCriteria'];
    this.tableDisplay = true;
    let url = "";
    if (this.searchShowType == 'history') {
      url = '/searchShowHistory';
    } else if (this.searchShowType == 'search' || this.searchShowType == 'admin') {
      url = '/searchShow';
    }
    this.httpClient.post(url, this.search).subscribe(res => {
      for (var i = 0; i < res.data.length; i++) {
        let current = new Date();
        current.setTime(current.getTime() - current.getTimezoneOffset() * 60000);
        res.data[i].validLogVisit = current <= new Date(res.data[i].date_time);
        res.data[i].date = moment(res.data[i].date_time).format('MM/DD/YYYY [at] hh:mm A');
        res.data[i].logged = false;
      }
      // console.log(res.data);
      this.dataSource = new MatTableDataSource<any>(res.data);
    });
  }

  logVisit(e) {
    e.username = localStorage.getItem('username');
    console.log(e);
    this.httpClient.post('/logVisitShow', {data: e}).subscribe();
  }

  deleteShow(e) {
    console.log(e);
  }
  
  exhibitDetail(data) {
    this.httpClient.post('/searchExhibit', {
      criteria: {
        name: true,
      },
      data: {
        name: data.exhibit
      }
    }).subscribe(res => {
      res.data[0].water_feature = res.data[0].water_feature ? "Yes" : "No";
      this.router.navigate(['exibit-detail'], {queryParams : res.data[0]});
    })
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
    let url = "";
    this.sortCriteria.criteria[sortField] = true;
    this.sortCriteria.ascending[sortField] = !this.sortCriteria.ascending[sortField];
    this.search['sortCriteria'] = this.sortCriteria;
    if (this.searchShowType == 'history') {
      url = '/searchShowHistory';
    } else if (this.searchShowType == 'search' || this.searchShowType == 'admin') {
      url = '/searchShow';
    }
    this.httpClient.post(url, this.search).subscribe(res => {
      for (var i = 0; i < res.data.length; i++) {
        let current = new Date();
        current.setTime(current.getTime() - current.getTimezoneOffset() * 60000);
        res.data[i].validLogVisit = current <= new Date(res.data[i].date_time);
        res.data[i].date = moment(res.data[i].date_time).format('MM/DD/YYYY [at] hh:mm A');
        res.data[i].logged = false;
      }
      // console.log(res.data);
      this.dataSource = new MatTableDataSource<any>(res.data);
    });
  }
}
