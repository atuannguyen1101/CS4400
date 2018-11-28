import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animal-detail-view',
  templateUrl: './animal-detail-view.component.html',
  styleUrls: ['./animal-detail-view.component.css']
})
export class AnimalDetailViewComponent implements OnInit {

  animal: any = {};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.animal.name = data['name'];
      this.animal.species = data['species'];
      this.animal.type = data['type'];
      this.animal.age = data['age'];
      this.animal.exhibit = data['exhibit'];
    })
  }

}
