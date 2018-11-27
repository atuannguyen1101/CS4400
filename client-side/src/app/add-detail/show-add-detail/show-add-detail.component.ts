import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../http-client.service';
import { Time } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare const moment: any;

@Component({
  selector: 'app-show-add-detail',
  templateUrl: './show-add-detail.component.html',
  styleUrls: ['./show-add-detail.component.css']
})
export class ShowAddDetailComponent implements OnInit {

  name: string;
  exhibit: any;
  time: string;
  staff: any;
  date: Date;
  picker: string;
  exhibitList: string[];
  staffList: string[];
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    exhibit: new FormControl('', Validators.required),
    staff: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required)
  })

  constructor(private httpClient: HttpClientService) { }

  ngOnInit() {
    this.httpClient.get('/exhibitList').subscribe(res => {
      this.exhibitList = res.data;
    });
    this.httpClient.get('/staffList').subscribe(res => {
      this.staffList = res.data;
    });
  }

  submit() {
    let hour = parseInt(this.time.substr(0, 2)) - 5;
    let minute = parseInt(this.time.substr(3, 2));
    this.date.setHours(hour, minute)
    // if (hour < 0) {
    //   this.date.setDate(this.date.getDate() + 1);
    // }
    // console.log(this.date);
    let data = {
      name: this.name,
      exhibit: this.exhibit.name,
      staff: this.staff.username,
      date: this.date
    }
    this.httpClient.post('/addShow', data)
    .subscribe((res) => {
      console.log(res);
    })
  }
}
