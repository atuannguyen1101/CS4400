import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStaffComponent } from './home-staff.component';

describe('HomeStaffComponent', () => {
  let component: HomeStaffComponent;
  let fixture: ComponentFixture<HomeStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
