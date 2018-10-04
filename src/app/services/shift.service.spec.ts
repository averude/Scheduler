import { TestBed, inject } from '@angular/core/testing';

import { ShiftService } from './shift.service';

describe('ShiftService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShiftService]
    });
  });

  it('should be created', inject([ShiftService], (service: ShiftService) => {
    expect(service).toBeTruthy();
  }));
});
