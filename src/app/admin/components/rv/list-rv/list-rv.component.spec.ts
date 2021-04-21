import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRvComponent } from './list-rv.component';

describe('ListRvComponent', () => {
  let component: ListRvComponent;
  let fixture: ComponentFixture<ListRvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
