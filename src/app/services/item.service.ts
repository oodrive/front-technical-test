import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private endPoint = 'http://localhost:8080/api/items';

  constructor(private http: HttpClient) { }

  getItems(id?: string) {
    let url = (id)? `${this.endPoint}?parentId=${id}` : this.endPoint;

    return this.http.get(url);
  }

  delete(id: string) {
    return this.http.delete(`${this.endPoint}/${id}`);
  }

  createFolder(payload: any, parentId?: string) {
    let url = (parentId)? `${this.endPoint}?parentId=${parentId}` : this.endPoint;
   
    return this.http.post(url, {...payload, folder: true});
  }

  addFiles(files: any, parentId?: string) {
    let url = (parentId)? `${this.endPoint}?parentId=${parentId}` : this.endPoint;
    return this.http.post(url, files);
  }

  update(id: string, payload: any) {
    return this.http.patch(`${this.endPoint}/${id}`, payload);
  }
}

