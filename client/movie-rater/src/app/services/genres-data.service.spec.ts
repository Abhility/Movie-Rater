import { TestBed } from '@angular/core/testing';

import { GenresDataService } from './genres-data.service';

describe('GenresDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenresDataService = TestBed.get(GenresDataService);
    expect(service).toBeTruthy();
  });
});
