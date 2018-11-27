import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';


@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.css']
})
export class ViewStaffComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'time'];
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
  time: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen',  time:'Monday'},
  {position: 2, name: 'Helium',  time:'Monday'},
  {position: 3, name: 'Lithium', time:'Monday'},
  {position: 4, name: 'Beryllium', time:'Monday'},
  {position: 5, name: 'Beryllium2', time:'Monday'},
  {position: 6, name: 'Beryllium3', time:'Monday'},
  {position: 7, name: 'Beryllium4', time:'Monday'},
];
