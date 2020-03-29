import { HttpHeaders } from '@angular/common/http';

export class HttpHeader {

    /**
     * Build and return the Headers Used for call api
     */
    public static getHeaders() {
        const headers: HttpHeaders = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT,OPTIONS');
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return headers;
    }
}