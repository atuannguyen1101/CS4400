import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { HttpClientService } from 'src/app/http-client.service';

@Component({
  selector: 'app-search-show',
  templateUrl: './search-show.component.html',
  styleUrls: ['./search-show.component.css']
})
export class SearchShowComponent implements OnInit {
  displayedColumns: string[] = ['name', 'exhibit', 'date', 'detail'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  exhibitList: string[];
  tableDisplay = false;

  search = {
    criteria: {
      name: true,
      date: true,
      exhibit: true
    },
    data: {
      name: "",
      exhibit: "",
      date: Date
    }
  }

  constructor(private httpClient: HttpClientService) { }

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
    this.httpClient.post('/searchAnimal', this.search).subscribe(res => {
      this.dataSource = new MatTableDataSource<any>(res.data);
    });
  }
}
