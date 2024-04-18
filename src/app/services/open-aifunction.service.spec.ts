import { TestBed } from '@angular/core/testing';

import { OpenAIFunctionService } from './open-aifunction.service';

describe('OpenAIFunctionService', () => {
  let service: OpenAIFunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenAIFunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
