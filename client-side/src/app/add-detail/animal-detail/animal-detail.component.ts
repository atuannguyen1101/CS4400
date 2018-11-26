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

  constructor(private httpClient: HttpClientService) { }

  ngOnInit() {
  }

  typeInput(event) {
    this.type = event.target.value;
  }

  nameInput(event) {
    this.name = event.target.value;
  }

  ageInput(event) {
    console.log(event);
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
