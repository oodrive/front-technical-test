import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http : HttpClient) { }

  configurationURL="/api/items";

	/********************** Get Files and Folders*************

	 *********************************************************/
    getAllItems(){

  	  return this.http.get(this.configurationURL);

     }

	/*****************************Download a File*****************
	 *
	 *************************************************************/
	downloadFile(itemId: string){
        return this.http.get(`${this.configurationURL}/${itemId}`, {responseType : 'blob'} );
	 }

	/*************** Upload a file*****************************************
	 *
	********************************************************************** */

	uploadFile(fileToUpload: any){
		const formData: FormData = new FormData();
		formData.append('fileKey', fileToUpload, fileToUpload.name);
		return this.http.post(`${this.configurationURL}`, formData,{
			reportProgress: true,
			observe: 'events',
		});
	}

}
