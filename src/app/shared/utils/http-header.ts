import { HttpHeaders } from '@angular/common/http';

export class HttpHeader {

    /**
     * Build and return the Headers Used for call api
     */
    public static getHeaders() {
        const headers: HttpHeaders = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT,OPTIONS');
        headers.append('Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
        return headers;
    }
}
