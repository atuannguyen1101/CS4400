import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitDetailViewComponent } from './exhibit-detail-view.component';

describe('ExhibitDetailViewComponent', () => {
  let component: ExhibitDetailViewComponent;
  let fixture: ComponentFixture<ExhibitDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
