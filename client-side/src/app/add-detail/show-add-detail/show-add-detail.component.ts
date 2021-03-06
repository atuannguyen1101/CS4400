import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../http-client.service';
import { Time } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare const moment: any;
declare const $: any;

@Component({
  selector: 'app-show-add-detail',
  templateUrl: './show-add-detail.component.html',
  styleUrls: ['./show-add-detail.component.css']
})
export class ShowAddDetailComponent implements OnInit {

  errorMessage = "";
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
    let newDate = new Date(this.date);
    let hour = parseInt(this.time.substr(0, 2));
    let minute = parseInt(this.time.substr(3, 2));
    newDate.setHours(hour, minute);
    newDate.setTime(newDate.getTime() - newDate.getTimezoneOffset() * 60000);
    let data = {
      name: this.name,
      exhibit: this.exhibit.name,
      staff: this.staff.username,
      date: newDate
    }
    this.httpClient.post('/addShow', data)
    .subscribe((res) => {
      $(".check_mark").addClass("hide");
      this.errorMessage = "";
      if (res['message'] == 'success') {
        setTimeout(function() {
          $(".check_mark").removeClass("hide");
        }, 10);
        setTimeout(() => {
          $(".check_mark").addClass("hide");
        }, 2500);
      } else {
        this.errorMessage = res['message'];
      }
    })
  }
}
