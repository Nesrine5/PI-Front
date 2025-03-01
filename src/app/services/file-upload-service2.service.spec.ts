import { TestBed } from '@angular/core/testing';

import { FileUploadService2Service } from './file-upload-service2.service';

describe('FileUploadService2Service', () => {
  let service: FileUploadService2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadService2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
