import { TestBed, inject } from '@angular/core/testing';

import { CourcesService } from './cources.service';

describe('CourcesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourcesService]
    });
  });

  it('should be created', inject([CourcesService], (service: CourcesService) => {
    expect(service).toBeTruthy();
  }));

  it('should return courses', inject([CourcesService], (service: CourcesService) => {
    expect(service.listCourses().length).toBe(3);
  }));
});
