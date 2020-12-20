import { TestBed } from '@angular/core/testing';

import { AppRouting.Module.TsService } from './app-routing.module.ts.service';

describe('AppRouting.Module.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppRouting.Module.TsService = TestBed.get(AppRouting.Module.TsService);
    expect(service).toBeTruthy();
  });
});
