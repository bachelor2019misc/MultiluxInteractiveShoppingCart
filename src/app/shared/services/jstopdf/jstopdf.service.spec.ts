import { TestBed } from '@angular/core/testing';

import { JstopdfService } from './jstopdf.service';

describe('JstopdfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JstopdfService = TestBed.get(JstopdfService);
    expect(service).toBeTruthy();
  });
});
