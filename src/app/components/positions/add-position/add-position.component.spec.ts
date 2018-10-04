import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPositionComponent } from './add-position.component';

describe('AddPositionComponent', () => {
  let component: AddPositionComponent;
  let fixture: ComponentFixture<AddPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
