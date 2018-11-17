import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVisitorComponent } from './home-visitor.component';

describe('HomeVisitorComponent', () => {
  let component: HomeVisitorComponent;
  let fixture: ComponentFixture<HomeVisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeVisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
