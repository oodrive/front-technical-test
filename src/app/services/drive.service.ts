import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
const apiBase = "/api";

@Injectable({
	providedIn: "root",
})
export class DriveService {
	constructor(private http: HttpClient) {}

	getItems() {
		return this.http.get(`${apiBase}/items`);
	}

	downloadItem(fileId: string) {
		const headers = new HttpHeaders();
		headers.set("accept", "*/*");
		return this.http.get(`${apiBase}/items/${fileId}`, {
			headers: headers,
			responseType: "arraybuffer",
		});
	}
	uploadItems(file: File, parentId?: string) {
		const formData = new FormData();
		formData.append(`${file.name}`, file, file.name);
		const url = parentId
			? `${apiBase}/items?parentId=${parentId}`
			: `${apiBase}/items`;
		return this.http.post(url, formData);
	}
}
