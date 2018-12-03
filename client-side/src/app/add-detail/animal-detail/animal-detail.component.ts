import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../http-client.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

declare const $: any;

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {

  checkBox = false;
  name: string = '';
  type: string = '';
  age: string = '';
  specie: string = '';
  exhibit: any;
  exhibitList: string[];
  typeList: string[] = ['Mammal', 'Bird', 'Amphibian', 'Reptile', 'Fish', 'Invertebrate'];
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl(''),
    type: new FormControl(''),
    exhibit: new FormControl('', Validators.required),
    specie: new FormControl('', Validators.required)
  });
  errorMessage = "";

  constructor(private httpClient: HttpClientService) { }

  ngOnInit() {
    this.httpClient.get('/exhibitList').subscribe(data => {
      this.exhibitList = data.data;
    })
  }

  submit() {
    let data = {
      name: this.name,
      type: this.type,
      age: this.age,
      specie: this.specie,
      exhibit: this.exhibit.name
    };
    this.httpClient.post("/addAnimal", data).subscribe((res) => {
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
    });
  }
}
