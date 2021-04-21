import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEnfantComponent } from './detail-enfant.component';

describe('DetailEnfantComponent', () => {
  let component: DetailEnfantComponent;
  let fixture: ComponentFixture<DetailEnfantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEnfantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
