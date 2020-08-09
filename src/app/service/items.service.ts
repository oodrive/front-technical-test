import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../model/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private url = 'http://localhost:8080/api/'

  constructor(
    private http: HttpClient
  ) { }

  public getItems(): Observable<Item[]> {
    const head = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http.get<Item[]>(this.url + 'items', { headers: head });
  }

  public downLoadFile(itemId: string) {
    return this.http.get(this.url + 'items/' + itemId);
  }

  public createFile(name: string, folder: string){
    const head = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
    const json = {
      "name": name,
      "folder": JSON.parse(folder)
    };

    return this.http.post(this.url + 'items', json, { headers: head });
  }

  public uploadFile(itemId: string): Observable<Item[]> {
    const head = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
    const json = {
      "parentId": itemId
    };

    return this.http.patch<Item[]>(this.url + 'items/' + itemId, json, { headers: head });
  }

  public deleteFile(itemId: string): Observable<Item[]> {
    const head = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http.delete<Item[]>(this.url + 'items/' + itemId, { headers: head });
  }


}
