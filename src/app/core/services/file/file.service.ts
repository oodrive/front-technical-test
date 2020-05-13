import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFile } from '../../models/file.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private httpClient: HttpClient) {}

  public getItems(folderId?: string): Observable<IFile[]> {
    const url = `/api/items`;
    let params = new HttpParams();
    if (folderId) {
      params = params.set('parentId', folderId);
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

  public downloadFile(file: IFile): Observable<any> {
    const url = `/api/items/${file.id}`;
    return this.httpClient.get(url);
  }

  public removeFile(file: IFile): Observable<any> {
    const url = `/api/items/${file.id}`;
    return this.httpClient.delete(url);
  }

  public renameFile(file: IFile): Observable<IFile> {
    const url = `/api/items/${file.id}`;
    const body = { name: file.name };
    return this.httpClient.patch<IFile>(url, body);
  }

  public moveFile(file: IFile): Observable<IFile> {
    const url = `/api/items/${file.id}`;
    const body = { parentId: file.parentId };
    return this.httpClient.patch<IFile>(url, body);
  }

  public createFolder(name: string, parentId?: string): Observable<IFile> {
    const url = `/api/items`;
    let params = new HttpParams();
    if (parentId) {
      params = params.set('parentId', parentId);
    }
    return this.httpClient.post<IFile>(url, { name, folder: true }, { params });
  }
}
