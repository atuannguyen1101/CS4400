import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../http-client.service';

@Component({
  selector: 'app-show-add-detail',
  templateUrl: './show-add-detail.component.html',
  styleUrls: ['./show-add-detail.component.css']
})
export class ShowAddDetailComponent implements OnInit {

  name: string = '';
  exhibit: string = '';
  time: string = '';
  staff: string = '';
  date: string = '';
  picker: string = '';

  constructor(private httpClient: HttpClientService) { }

  ngOnInit() {
  }

  nameInput(event) {
    this.name = event.target.value;
  }

  timeInput(event) {
    this.time = event.target.value;
  }

  submit() {
    let data = {
      name: this.name,
      exhibit: this.exhibit,
      time: this.time,
      staff: this.staff,
      date: this.date
    }
    this.httpClient.post('/addShow', data)
    .subscribe((res) => {
      console.log(res);
    })
  }
}
