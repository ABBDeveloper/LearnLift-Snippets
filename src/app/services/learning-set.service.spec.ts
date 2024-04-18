import { TestBed } from '@angular/core/testing';

import { LearningSetService } from './learning-set.service';

describe('LearningSetService', () => {
  let service: LearningSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
