import { TestBed } from '@angular/core/testing';

import { DayTypeService } from './daytype.service';

describe('DayTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DayTypeService = TestBed.get(DayTypeService);
    expect(service).toBeTruthy();
  });
});
