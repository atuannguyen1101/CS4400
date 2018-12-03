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

  sortCriteria = {
    criteria: {
      name: false,
      exhibit: false,
      species: false,
      age: false,
      type: false
    },
    ascending: {
      name: false,
      exhibit: false,
      species: false,
      age: false,
      type: false
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
    delete this.search['sortCriteria'];
    this.tableDisplay = true;
    this.httpClient.post('/searchAnimal', this.search).subscribe(res => {
      this.dataSource = new MatTableDataSource<any>(res.data);
    });
  }

  remove(e) {
    this.httpClient.post('/removeAnimal', e).subscribe(res => {
      this.httpClient.post('/searchAnimal', this.search).subscribe(res => {
        this.dataSource = new MatTableDataSource<any>(res.data);
      });
    })
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
    this.httpClient.post('/searchAnimal', this.search).subscribe(res => {
      this.dataSource = new MatTableDataSource<any>(res.data);
    });
  };

  exhibitDetail(data) {
    this.httpClient.post('/searchExhibit', {
      criteria: {
        name: true,
      },
      data: {
        name: data.exhibit
      }
    }).subscribe(res => {
      res.data[0].water_feature = res.data[0].water_feature ? "Yes" : "No";
      this.router.navigate(['exibit-detail'], {queryParams : res.data[0]});
    })
  }
}
