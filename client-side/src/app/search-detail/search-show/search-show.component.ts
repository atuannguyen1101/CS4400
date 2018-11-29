import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { HttpClientService } from 'src/app/http-client.service';
import { Router } from '@angular/router';

declare const moment: any;

@Component({
  selector: 'app-search-show',
  templateUrl: './search-show.component.html',
  styleUrls: ['./search-show.component.css']
})
export class SearchShowComponent implements OnInit {
  displayedColumns: string[] = ['name', 'exhibit', 'date', 'check'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  exhibitList: string[];
  tableDisplay = false;

  search = {
    criteria: {
      name: false,
      date: false,
      exhibit: false
    },
    data: {
      name: "",
      exhibit: "",
      date: Date
    }
  }

  constructor(private httpClient: HttpClientService,
    private router: Router) { }

  ngOnInit() {
    this.httpClient.get('/exhibitList').subscribe(data => {
      this.exhibitList = data.data;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  searchClicked() {
    console.log(this.search);
    this.tableDisplay = true;
    this.httpClient.post('/searchShow', this.search).subscribe(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].date = moment(res.data[i].date_time).format('MM/DD/YYYY [at] hh:mm A');
        res.data[i].logged = false;
      }
      this.dataSource = new MatTableDataSource<any>(res.data);
    });
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
}
