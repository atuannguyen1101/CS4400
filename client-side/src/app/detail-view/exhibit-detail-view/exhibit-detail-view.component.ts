import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from 'src/app/http-client.service';

@Component({
  selector: 'app-exhibit-detail-view',
  templateUrl: './exhibit-detail-view.component.html',
  styleUrls: ['./exhibit-detail-view.component.css']
})


export class ExhibitDetailViewComponent implements OnInit {
  displayedColumns: string[] = ['name', 'species', 'detail'];
  dataSource: any = [];
  exhibit: any = {};

  search: any = {};

  sortCriteria = {
    criteria: {
      name: false,
      species: false
    },
    ascending: {
      name: false,
      species: false
    }
  }

  constructor(private route: ActivatedRoute,
    private httpClient: HttpClientService,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      // console.log(data);
      // console.log(data['name'])
      this.exhibit.name = data['name'];
      this.exhibit.size = data['size'];
      this.exhibit.numOfAnimals = data['numOfAnimals']
      this.exhibit.water_feature = data['water_feature'];
      this.search = this.exhibit
      this.httpClient.post('/animalByExhibit', this.search).subscribe(res => {
        this.dataSource = new MatTableDataSource<any>(res.data);
      })
    })
  }

  logVisit() {
    let date = new Date();
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);
    this.httpClient.post('/logVisit', {
      exhibit: this.exhibit.name,
      date: date,
      visitor: localStorage.getItem('username')
    }).subscribe(res => {
      console.log(res);
    });
  }

  animalDetail(data) { 
    this.router.navigate(['animal-detail'], {queryParams : data});
  }

  sort(e) {
    let sortField = e.target.innerText.toLowerCase();
    for (var i of Object.keys(this.sortCriteria.criteria)) {
      if (i != sortField) {
        this.sortCriteria.criteria[i] = false;
        this.sortCriteria.ascending[i] = false;
      }
    }
    this.sortCriteria.criteria[sortField] = true;
    this.sortCriteria.ascending[sortField] = !this.sortCriteria.ascending[sortField];
    this.search['sortCriteria'] = this.sortCriteria;
    this.httpClient.post('/animalByExhibit', this.search).subscribe(res => {
      this.dataSource = new MatTableDataSource<any>(res.data);
    });
  }
}


