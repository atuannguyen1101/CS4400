import { Component, OnInit } from '@angular/core';
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

  constructor() { }

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
    let req = {
      name: this.name,
      type: this.type,
      age: this.age,
      specie: this.specie,
      exhibit: this.exhibit
    };
    console.log(req);
  }
}
