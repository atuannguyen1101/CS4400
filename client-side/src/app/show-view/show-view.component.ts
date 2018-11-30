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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private httpClient: HttpClientService) { }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.httpClient.post('/searchShow', {
      criteria: {
        host: true
      }, 
      data: {
        host: localStorage.getItem('username')
      }
    }).subscribe(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].date = moment(res.data[i].date_time).format('MM/DD/YYYY [at] hh:mm A');
        res.data[i].logged = false;
      }
      console.log(res.data)
      this.dataSource = new MatTableDataSource<any>(res.data);
    })
  }

}

