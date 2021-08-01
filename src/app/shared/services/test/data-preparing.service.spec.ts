import { TestBed } from '@angular/core/testing';

import { DataPreparingService } from '../services/data-preparing.service';

describe('DataPreparingService', () => {
  let service: DataPreparingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPreparingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
