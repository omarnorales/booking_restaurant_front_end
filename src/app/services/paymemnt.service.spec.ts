import { TestBed } from '@angular/core/testing';

import { PaymemntService } from './payment.service';

describe('PaymemntService', () => {
  let service: PaymemntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymemntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
