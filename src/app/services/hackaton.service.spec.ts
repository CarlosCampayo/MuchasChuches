import { TestBed } from '@angular/core/testing';

import { HackatonService } from './hackaton.service';

describe('HackatonService', () => {
  let service: HackatonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HackatonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
