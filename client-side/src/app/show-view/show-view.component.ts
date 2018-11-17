import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'app-show-view',
  templateUrl: './show-view.component.html',
  styleUrls: ['./show-view.component.css']
})
export class ShowViewComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'time', 'exhibit'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  exhibit: string;
  time: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen',  exhibit: 'H', time:'Monday'},
  {position: 2, name: 'Helium',  exhibit: 'He',time:'Monday'},
  {position: 3, name: 'Lithium', exhibit: 'Li', time:'Monday'},
  {position: 4, name: 'Beryllium', exhibit: 'Be', time:'Monday'},
  {position: 5, name: 'Beryllium2', exhibit: 'Be', time:'Monday'},
  {position: 6, name: 'Beryllium3', exhibit: 'Be', time:'Monday'},
  {position: 7, name: 'Beryllium4', exhibit: 'Be', time:'Monday'},
];

