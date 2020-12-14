import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { Items } from '../models/Items';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { Upload } from '../models/Upload';


@Injectable({
	providedIn: 'root',
})
export class ItemService {
route="http://localhost:8080/api"
	constructor(private http: HttpClient) { }

	upload(file: File): any {
		const formData = new FormData();
		formData.append('file', file);
		return this.http.post<Upload>(this.route+'/items/', formData );
	}

	createFolder(name: string): any {
		return this.http.post<Upload>(this.route+'/items/', { name, folder: true } );
	}

	getItems(): Observable<Item[]> {
		return this.http.get<Items>(this.route+'/items/' )
			.pipe(map((resp) => {
				 resp.items.map((item: Item) => {
					item.creation = new Date(item.creation);
					item.modification = new Date(item.modification);
				});
				return resp.items;
			}));
	}

	download(id: string): Observable<ArrayBuffer> {
		return this.http.get(this.route +`/items/${id}`, { responseType: 'arraybuffer' });
	}

	deleteItem(id: string): Observable<string> {
		return this.http.delete<string>(this.route+`/items/${id}`);
	}

	updateItem(id: string, name: string): Observable<string> {
		return this.http.patch<string>(this.route+`/items/${id}`, { name });
	}
}