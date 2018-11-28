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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
    private httpClient: HttpClientService,
    private router: Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.route.queryParams.subscribe(data => {
      // console.log(data);
      // console.log(data['name'])
      this.exhibit.name = data['name'];
      this.exhibit.size = data['size'];
      this.exhibit.numOfAnimals = data['numOfAnimals']
      this.exhibit.water_feature = data['water_feature'];
      this.httpClient.post('/animalByExhibit', this.exhibit).subscribe(res => {
        this.dataSource = new MatTableDataSource<any>(res.data);
      })
    })
  }

  animalDetail(data) { 
    this.router.navigate(['animal-detail'], {queryParams : data});
  }
}


