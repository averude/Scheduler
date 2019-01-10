import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDaytypeComponent } from './add-daytype.component';

describe('AddDaytypeComponent', () => {
  let component: AddDaytypeComponent;
  let fixture: ComponentFixture<AddDaytypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDaytypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDaytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
