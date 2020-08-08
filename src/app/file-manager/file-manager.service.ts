import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class FileManagerService {
	private baseUrl = "http://localhost:8080/api";
	constructor(private http: HttpClient) {}
	getFirstItems() {
		return this.http.get(`${this.baseUrl}/items`);
	}
	upload(file: any) {
		return this.http.post(`${this.baseUrl}/items`, file);
	}
	delete(id: string) {
		return this.http.delete(`${this.baseUrl}/items/${id}`);
	}
	download(id: string) {
		console.log(id);
		return this.http.get(`${this.baseUrl}/items/${id}`, {
			responseType: "blob",
		});
	}
}
