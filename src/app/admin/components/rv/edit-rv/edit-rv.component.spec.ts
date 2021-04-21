import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRvComponent } from './edit-rv.component';

describe('EditRvComponent', () => {
  let component: EditRvComponent;
  let fixture: ComponentFixture<EditRvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
