import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../http-client.service';
// import { ConsoleReporter } from 'jasmine';



@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {

  name: string = '';
  type: string = '';
  age: string = '';
  specie: string = '';
  exhibit: string = '';
  exhibitList: string[];

  constructor(private httpClient: HttpClientService) { }

  ngOnInit() {
    this.httpClient.get('/exhibitList').subscribe(data => {
      this.exhibitList = data;
    })
  }

  specieInput(event) {
    this.specie = event.target.value;
  }

  nameInput(event) {
    this.name = event.target.value;
  }

  submit() {
    let data = {
      name: this.name,
      type: this.type,
      age: this.age,
      specie: this.specie,
      exhibit: this.exhibit
    };
    this.httpClient.post("/addAnimal", data).subscribe((res) => {
      console.log(res);
    });
  }
}
