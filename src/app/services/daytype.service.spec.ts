import { TestBed } from '@angular/core/testing';

import { DaytypeService } from './daytype.service';

describe('DaytypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DaytypeService = TestBed.get(DaytypeService);
    expect(service).toBeTruthy();
  });
});
