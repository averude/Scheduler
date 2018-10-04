import { TestBed, inject } from '@angular/core/testing';

import { PatternService } from './pattern.service';

describe('PatternService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatternService]
    });
  });

  it('should be created', inject([PatternService], (service: PatternService) => {
    expect(service).toBeTruthy();
  }));
});
