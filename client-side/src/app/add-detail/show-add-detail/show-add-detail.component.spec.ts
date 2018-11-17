import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAddDetailComponent } from './show-add-detail.component';

describe('ShowAddDetailComponent', () => {
  let component: ShowAddDetailComponent;
  let fixture: ComponentFixture<ShowAddDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAddDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAddDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
