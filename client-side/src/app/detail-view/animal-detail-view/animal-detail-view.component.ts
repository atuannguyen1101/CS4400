import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { HttpClientService } from 'src/app/http-client.service';

declare const moment: any;

@Component({
  selector: 'app-animal-detail-view',
  templateUrl: './animal-detail-view.component.html',
  styleUrls: ['./animal-detail-view.component.css']
})
export class AnimalDetailViewComponent implements OnInit {

  displayedColumns: string[] = ['staff', 'note', 'time'];
  dataSource = new MatTableDataSource<any>([]);
  tableData: any[];

  animal: any = {};
  userType: string;
  note: string;
  
  form = new FormGroup({
    note: new FormControl('', Validators.required)
  });

  constructor(private route: ActivatedRoute,
    private httpClient: HttpClientService) { }

  ngOnInit() {
    this.userType = localStorage.getItem('user_type');
    this.route.queryParams.subscribe(data => {
      this.animal.name = data['name'];
      this.animal.species = data['species'];
      this.animal.type = data['type'];
      this.animal.age = data['age'];
      this.animal.exhibit = data['exhibit'];
    })
    this.httpClient.post('/animalNote', {
      name: this.animal.name,
      species: this.animal.species
    }).subscribe(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].date = moment(res.data[i].date_time).format('MM/DD/YYYY [at] hh:mm A');
      }
      this.tableData = res.data;
      this.dataSource = new MatTableDataSource<any>(this.tableData);
    })
  }

  saveNote() {
    this.animal.note = this.note;
    this.animal.staff = localStorage.getItem('username');
    let date = new Date();
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);
    this.animal.date = date;
    this.httpClient.post('/addNote', this.animal).subscribe(res => {
      this.tableData.push({
        staff_member: this.animal.staff,
        text_care: this.animal.note,
        date: moment().format('MM/DD/YYYY [at] hh:mm A')
      })
      this.dataSource = new MatTableDataSource<any>(this.tableData);
    });
  }

}
