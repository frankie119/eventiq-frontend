import { TestBed } from '@angular/core/testing';

import { EventData } from './event-data';

describe('EventData', () => {
  let service: EventData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
