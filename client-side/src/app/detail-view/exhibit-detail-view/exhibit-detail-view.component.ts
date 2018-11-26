import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'app-exhibit-detail-view',
  templateUrl: './exhibit-detail-view.component.html',
  styleUrls: ['./exhibit-detail-view.component.css']
})
export class ExhibitDetailViewComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'species'];
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
    position: number;
    species: string;

  }

  const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen',  species: 'H'},
    {position: 2, name: 'Helium',  species: 'He'},
    {position: 3, name: 'Lithium', species: 'Li'},
    {position: 4, name: 'Beryllium', species: 'Be'},
    {position: 5, name: 'Beryllium2', species: 'Be'},
    {position: 6, name: 'Beryllium3', species: 'Be'},
    {position: 7, name: 'Beryllium4', species: 'Be'},
  ];


