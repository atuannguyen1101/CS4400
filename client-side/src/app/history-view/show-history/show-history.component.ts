import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';


@Component({
  selector: 'app-show-history',
  templateUrl: './show-history.component.html',
  styleUrls: ['./show-history.component.css']
})
export class ShowHistoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'exhibit', 'date'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  showSearchType: string;

  search = {
    criteria: {
      name: false,
      exhibit: false,
      date: false
    }, 
    data: {
      name: "",
      exhibit: "",
      date: Date()
    }
  }

  constructor() { }

  ngOnInit() {
    this.showSearchType = localStorage.getItem('showSearchType');
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

  export interface PeriodicElement {
    name: string;
    time: number;
    visit: number;

  }

  const ELEMENT_DATA: PeriodicElement[] = [
    {time: 1, name: 'Hydrogen',  visit: 5},
    {time: 2, name: 'Helium',  visit: 5},
    {time: 3, name: 'Lithium', visit: 5},
    {time: 4, name: 'Beryllium', visit: 5},
    {time: 5, name: 'Beryllium2', visit: 5},
    {time: 6, name: 'Beryllium3', visit: 5},
    {time: 7, name: 'Beryllium4', visit: 5},
  ];
