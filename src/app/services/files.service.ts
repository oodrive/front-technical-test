import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class FilesService {
	baseUrl = 'http://localhost:8080/api/items';

	constructor(private http: HttpClient) { }

	getRootsS() {
		return this.http.get(this.baseUrl);
	}
	uploadFiles(formData: any) {
		return this.http.post(this.baseUrl, formData);
	}
	deleteFile(id: any) {
		return this.http.delete(this.baseUrl + '/' + id);
	}

}
