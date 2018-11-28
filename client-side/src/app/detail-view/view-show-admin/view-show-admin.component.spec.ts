import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShowAdminComponent } from './view-show-admin.component';

describe('ViewShowAdminComponent', () => {
  let component: ViewShowAdminComponent;
  let fixture: ComponentFixture<ViewShowAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewShowAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewShowAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
