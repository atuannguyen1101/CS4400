import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibitDetailComponent } from './exibit-detail.component';

describe('ExibitDetailComponent', () => {
  let component: ExibitDetailComponent;
  let fixture: ComponentFixture<ExibitDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibitDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
