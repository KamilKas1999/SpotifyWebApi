import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DataPreparingService } from './data-preparing.service';

describe('DataPreparingService', () => {
  let service: DataPreparingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataPreparingService],
    });
    service = TestBed.inject(DataPreparingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
