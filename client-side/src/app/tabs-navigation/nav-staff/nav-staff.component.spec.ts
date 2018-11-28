import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavStaffComponent } from './nav-staff.component';

describe('NavStaffComponent', () => {
  let component: NavStaffComponent;
  let fixture: ComponentFixture<NavStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
