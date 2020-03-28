import { TestBed } from '@angular/core/testing';
import { FilesManagerService } from './files-manager.service';

describe('FilesManagerService', () => {
  let service: FilesManagerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FilesManagerService, useClass: FilesManagerService },
      ],
    }),
      service = TestBed.get(FilesManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
