import { TestBed } from '@angular/core/testing';

import { EmailDataService } from './email-data.service';

describe('EmailDataService', () => {
  let service: EmailDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
