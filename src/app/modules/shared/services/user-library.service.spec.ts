import { TestBed } from '@angular/core/testing';

import { UserLibraryService } from './user-library.service';

describe('UserLibraryService', () => {
  let service: UserLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
