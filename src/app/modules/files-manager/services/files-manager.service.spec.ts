import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { Helper } from '../../../core/services/helper.service';
import { MockItem } from '../../../shared/mocks/mock-item';
import { Item } from '../models/item';
import { FilesManagerService } from './files-manager.service';

describe('[Service] FilesManagerService', () => {
  let service: FilesManagerService;
  let httpMock: HttpTestingController;
  const itemsMock: Item[] = MockItem;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: Helper, useClass: Helper },
        { provide: FilesManagerService, useClass: FilesManagerService },
      ],
    }),
      service = TestBed.get(FilesManagerService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created - [#InjectService]', () => {
    expect(service).toBeTruthy();
  });

  /**
	 * @Test : if service return the list of items by parentId
	 */
  it('should return an Observable<Items[]> -[#getItems]', () => {
    // Act
    service.getItems().subscribe((items: Item[]) => {
      // Assert
      expect(items.length).toBe(2);
      expect(items).toEqual(itemsMock);
    });
    // Assert
    const request = httpMock.expectOne(`${environment.items_api_url}`);
    expect(request.request.method).toBe('GET');
    request.flush(itemsMock);
  });

  /**
	 * @Test : if service return the list of items by the given ID
	 */
  it('should return an Observable<Items[]> - [#getItemsById]', () => {
    // Arrange
    const response: Item[] = new Array(itemsMock[0]);

    // Act
    service.getItemsById('QuFnIHZxm').subscribe((items: Item[]) => {
      // Assert
      expect(items.length).toBe(1);
      expect(items[0]).toEqual(itemsMock[0]);
    });

    // Assert
    const request = httpMock.expectOne(`${environment.items_api_url}/QuFnIHZxm/path`);
    expect(request.request.method).toBe('GET');
    request.flush(response);
  });

  /**
    * @Test : upload a file
    */
  it('Should upload a file - [#Upload] and return the item information', () => {
    // Generate a file
    const arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(new Blob(['this data for testing the files upload'], { type: 'text/plain' }));
    const mockFile = new Array(new File(arrayOfBlob, 'Mock.text'));

    // Act : upload a file
    service.upload(mockFile).subscribe((response: Item) => {
      // Assert
      expect(response.folder).toEqual(false);
      expect(response.id).toEqual(itemsMock[1].id);
    });

    const request = httpMock.expectOne({
      url: environment.items_api_url,
      method: 'POST',
    });
    expect(request.request.method).toBe('POST');
    request.flush(itemsMock[1]);

  });
});
