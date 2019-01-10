import { TestBed, inject } from '@angular/core/testing';

import { ShiftPatternService } from './shiftpattern.service';

describe('ShiftPatternService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShiftPatternService]
    });
  });

  it('should be created', inject([ShiftPatternService], (service: ShiftPatternService) => {
    expect(service).toBeTruthy();
  }));
});
