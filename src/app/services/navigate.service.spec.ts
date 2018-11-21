import { TestBed } from '@angular/core/testing';

import { NavigateService } from './navigate.service';

describe('NavigateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavigateService = TestBed.get(NavigateService);
    expect(service).toBeTruthy();
  });
});
