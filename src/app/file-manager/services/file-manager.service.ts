import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Item } from '../models/item.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class FileManagerService {

	public apiUrl = '/api/items';
	constructor(private http: HttpClient) { }

	retrieveItems(parentId?: string): Observable<Item[]> {
		if (parentId) {
			this.apiUrl = this.apiUrl + '?parentId=' + parentId;
			return this.http.get<Item[]>(this.apiUrl)
				.pipe(catchError(this.handleError));
		} else {
			this.apiUrl = '/api/items';
			return this.http.get<Item[]>(this.apiUrl)
				.pipe(catchError(this.handleError));
		}
	}

	createFolder(folderName: string, parentId?: string): Observable<Item> {
		if (parentId) {
			this.apiUrl = (this.apiUrl + '?parentId=' + parentId);
		}
		let folder: any;
		folder = { name: folderName, folder: true };
		return this.http.post<Item>(this.apiUrl, folder);
	}

	uploadFiles(filesToUpload: any[], parentId?: string): Observable<any> {
		if (parentId) {
			this.apiUrl = (this.apiUrl + '?parentId=' + parentId);
		}
		const formData: FormData = new FormData();
		for (let i = 0; i < filesToUpload.length; i++) {
			formData.append('filesToUpload[]', filesToUpload[i], filesToUpload[i].name);
		}
		return this.http.post(this.apiUrl, formData)
			.pipe(catchError(this.handleError));
	}

	downloadFile(itemId: string): Observable<any> {
		return this.http.get(this.apiUrl + '/' + itemId, { responseType: 'blob' })
			.pipe(catchError(this.handleError));
	}

	deleteItem(itemId: string): Observable<any> {
		return this.http.delete(this.apiUrl + '/' + itemId)
			.pipe(catchError(this.handleError));
	}

	moveItem(itemId: string, parentId?: string): Observable<Item> {
		return this.http.patch<Item>(this.apiUrl + '/' + itemId, { parentId })
			.pipe(catchError(this.handleError));
	}

	renameItem(name: string, itemId: string): Observable<Item> {
		return this.http.patch<Item>(this.apiUrl + '/' + itemId, { name })
			.pipe(catchError(this.handleError));
	}

	retrieveItemPath(itemId: string): Observable<Item[]> {
		return this.http.get<Item[]>(this.apiUrl + '/' + itemId + '/path')
			.pipe(catchError(this.handleError));
	}

	private handleError(errorResponse: HttpErrorResponse) {
		if (errorResponse.error instanceof ErrorEvent) {
			alert('Client side Error ' + errorResponse.error.message);
		} else {
			alert('Back side Error ' + errorResponse.error.message);
		}
		return throwError('there is a problem with the service.!!! ');
	}
}
