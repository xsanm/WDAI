import { TestBed } from '@angular/core/testing';

import { AddingService } from './adding.service';

describe('AddingService', () => {
  let service: AddingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
