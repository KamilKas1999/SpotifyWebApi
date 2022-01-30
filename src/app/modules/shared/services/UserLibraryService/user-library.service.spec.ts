import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserLibraryService } from './user-library.service';

describe('UserLibraryService', () => {
  let service: UserLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserLibraryService],
    });
    service = TestBed.inject(UserLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
