import { TestBed } from '@angular/core/testing';

import { AmiiboApiServiceService } from './amiibo-api-service.service';

describe('AmiiboApiServiceService', () => {
  let service: AmiiboApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmiiboApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
