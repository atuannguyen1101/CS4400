import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnimalsAdminComponent } from './view-animals-admin.component';

describe('ViewAnimalsAdminComponent', () => {
  let component: ViewAnimalsAdminComponent;
  let fixture: ComponentFixture<ViewAnimalsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAnimalsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAnimalsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
