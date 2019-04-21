import { TestBed } from '@angular/core/testing';

import { SubproductService } from './subproduct.service';

describe('SubproductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubproductService = TestBed.get(SubproductService);
    expect(service).toBeTruthy();
  });
});
