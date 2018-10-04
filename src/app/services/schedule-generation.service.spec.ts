import { TestBed, inject } from '@angular/core/testing';

import { ScheduleGenerationService } from './schedule-generation.service';

describe('ScheduleGenerationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleGenerationService]
    });
  });

  it('should be created', inject([ScheduleGenerationService], (service: ScheduleGenerationService) => {
    expect(service).toBeTruthy();
  }));
});
