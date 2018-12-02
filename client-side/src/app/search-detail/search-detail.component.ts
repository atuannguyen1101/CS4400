import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.css']
})
export class SearchDetailComponent implements OnInit, AfterViewInit {

  currentRoute = 'search-exhibit';
  itemFeatures = [
    {'value': "Yes"},
    {'value': "No"}
  ]
  search = {
    "criteria": {
      "name": false,
      "size": false,
      "numOfAnimals": false,
      "water_feature": false
    },
    "data": {
      "name": "",
      "numMin": 0,
      "numMax": 0,
      "sizeMin": 0,
      "sizeMax": 0,
      "water_feature": false
    }
  }

  sortCriteria = {
    criteria: {
      "name": false,
      "size": false,
      "numOfAnimals": false,
      "water_feature": false
    },
    ascending: {
      "name": false,
      "size": false,
      "numOfAnimals": false,
      "water_feature": false
    }
  }
  clickedYet : boolean = false;

  // Table view List
  displayedColumns: string[] = ['name', 'size', 'numOfAnimals', 'water', 'detail'];
  dataSource = new MatTableDataSource<any>([]);

  // dataSource: MatTableDataSource<exhibitData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  constructor(private httpClient: HttpClientService,
    private router: Router) {
  }


  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  // Receive event whenever water features selected
  featureSelected(event) {
    this.search.data.water_feature = (event == "Yes") ? true : false;
  }

  // Event clicked
  searchClicked() {
    this.clickedYet = true;
    delete this.search['sortCriteria'];
    
    this.httpClient.post('/searchExhibit', this.search).subscribe(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].water_feature = res.data[i].water_feature ? "Yes" : "No";
      }
      this.dataSource = new MatTableDataSource<any>(res.data);
    })
  }

  exhibitDetail(data) {
    this.router.navigate(['exibit-detail'], {queryParams : data});
  }

  sort(e) {
    let sortField = e.target.innerText.toLowerCase();
    if (sortField == "number of animals") {
      sortField = "numOfAnimals";
    } else if (sortField == "water") {
      sortField = "water_feature";
    }
    for (var i of Object.keys(this.sortCriteria.criteria)) {
      if (i != sortField) {
        this.sortCriteria.criteria[i] = false;
        this.sortCriteria.ascending[i] = false;
      }
    }
    this.sortCriteria.criteria[sortField] = true;
    this.sortCriteria.ascending[sortField] = !this.sortCriteria.ascending[sortField];
    this.search['sortCriteria'] = this.sortCriteria;
    this.httpClient.post('/searchExhibit', this.search).subscribe(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].water_feature = res.data[i].water_feature ? "Yes" : "No";
      }
      this.dataSource = new MatTableDataSource<any>(res.data);
    });
  }
}
