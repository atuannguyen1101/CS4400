import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalCareComponent } from './animal-care.component';

describe('AnimalCareComponent', () => {
  let component: AnimalCareComponent;
  let fixture: ComponentFixture<AnimalCareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalCareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
