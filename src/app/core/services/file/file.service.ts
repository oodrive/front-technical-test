import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { File } from '../../models/file.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private httpClient: HttpClient) {}

  /**
   * getItems
   *
   */
  public getItems(folderId?: string): Observable<File[]> {
    const url = `/api/items`;
    let params = new HttpParams();
    if (folderId) {
      params = params.set('folderId', folderId);
    }
    return this.httpClient
      .get<any[]>(url, { params })
      .pipe(
        map((data) =>
          data['items'].map((item) => ({
            id: item.id,
            name: item.name,
            folder: item.folder,
            creation: item.creation,
            modification: item.modification,
          }))
        )
      );
  }
}
