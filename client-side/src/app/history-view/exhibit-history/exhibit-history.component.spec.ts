import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitHistoryComponent } from './exhibit-history.component';

describe('ExhibitHistoryComponent', () => {
  let component: ExhibitHistoryComponent;
  let fixture: ComponentFixture<ExhibitHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
