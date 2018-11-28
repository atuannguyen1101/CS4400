import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'app-view-animals-admin',
  templateUrl: './view-animals-admin.component.html',
  styleUrls: ['./view-animals-admin.component.css']
})
export class ViewAnimalsAdminComponent implements OnInit {
  displayedColumns: string[] = ['species', 'name', 'type', 'exhibit', 'age'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
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
    species: string;
    type: string;
    age: number;
    exhibit: string;

  }

  const ELEMENT_DATA: PeriodicElement[] = [
    {age: 1, name: 'Hydrogen',  species: 'Hydrogen', type: 'Hydrogen',exhibit: 'Hydrogen'},
    {age: 2, name: 'Helium',  species: 'Hydrogen',type: 'Hydrogen',exhibit: 'Hydrogen'}
  ];
