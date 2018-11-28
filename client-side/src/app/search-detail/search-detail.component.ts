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
      "name": true,
      "size": true,
      "numOfAnimals": true,
      "water_feature": true
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
  clickedYet : boolean = false;
  searchFieldVal: String = '';
  numMin = 0;
  numMax = 1;
  sizeMin = 0;
  sizeMax = 100;
  waterFeatures: String = '';

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
    console.log(this.search);
    
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
}
