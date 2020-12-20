import { TestBed } from '@angular/core/testing';

import { File.Service.TsService } from './file.service.ts.service';

describe('File.Service.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: File.Service.TsService = TestBed.get(File.Service.TsService);
    expect(service).toBeTruthy();
  });
});
