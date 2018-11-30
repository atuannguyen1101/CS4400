import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { HttpClientService } from 'src/app/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-animal',
  templateUrl: './search-animal.component.html',
  styleUrls: ['./search-animal.component.css']
})
export class SearchAnimalComponent implements OnInit {
  displayedColumns: string[] = ['species', 'name', 'type', 'exhibit', 'age', 'detail'];
  dataSource = new MatTableDataSource<any>([]);
  typeList: string[] = ['Mammal', 'Bird', 'Amphibian', 'Reptile', 'Fish', 'Invertebrate'];
  exhibitList: string[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userLink: string;

  search = {
    criteria: {
      name: false,
      exhibit: false,
      species: false,
      age: false,
      type: false
    },
    data: {
      name: "",
      exhibit: "",
      species: "",
      ageMin: 0,
      ageMax: 0,
      type: ""
    }
  }

  tableDisplay = false;

  constructor(private httpClient: HttpClientService,
    private router: Router) { }

  ngOnInit() {
    this.httpClient.get('/exhibitList').subscribe(data => {
      this.exhibitList = data.data;
    });
    if (localStorage.getItem('user_type') == 'Visitor') {
      this.userLink = "Detail";
    } else if (localStorage.getItem('user_type') == 'Staff') {
      this.userLink = "Note";
    } else {
      this.userLink = "Remove"
    }
  }

  searchClicked() {
    this.tableDisplay = true;
    this.httpClient.post('/searchAnimal', this.search).subscribe(res => {
      this.dataSource = new MatTableDataSource<any>(res.data);
    });
  }

  remove(e) {
    console.log(e);
  }

  animalDetail(data) { 
    this.router.navigate(['animal-detail'], {queryParams : data});
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
