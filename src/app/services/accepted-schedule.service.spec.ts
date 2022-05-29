import { TestBed } from '@angular/core/testing';

import { AcceptedScheduleService } from './accepted-schedule.service';

describe('AcceptedScheduleService', () => {
  let service: AcceptedScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptedScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
