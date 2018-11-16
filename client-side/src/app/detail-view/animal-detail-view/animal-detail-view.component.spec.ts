import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalDetailViewComponent } from './animal-detail-view.component';

describe('AnimalDetailViewComponent', () => {
  let component: AnimalDetailViewComponent;
  let fixture: ComponentFixture<AnimalDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
