import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileService} from "../../services/file.service";
import {Item} from "../../models/Item";
import {saveAs} from 'file-saver';
import {HttpEventType} from "@angular/common/http";
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'fl-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
	 private items: Item[];
     private errorMessage: string='';
	 private fileToUpload: any = null;
	 private percentDone:number = 0;
	 private uploaded:boolean=false;
	@ViewChild('inputFile', {static: true})
	myInputVariable: ElementRef;
	uploadForm = new FormGroup({
		file: new FormControl('file'),

	});
     constructor(private fileService:FileService) { }

  ngOnInit() {

   this.getListItems();
	}

/** **************List Files and folder******************/
	public getListItems(){
		this.fileService.getAllItems().subscribe((response:any) =>
			{
				if(response){

					this.items = response.items;

			/*		console.log("items ==============>",this.items);*/
				}
			},
			(error) => {
				this.errorMessage = error.message;
				console.log(this.errorMessage);
			}

		)
	}
/*****************************Download File Function*************************/
	public download(item: Item){

     	this.fileService.downloadFile(item.id).subscribe((response:any) =>
	   {
	/*	console.log("response for download====>", response)*/
	    saveAs(response, item.name);
		const fileURL = URL.createObjectURL(response);
		window.open(fileURL, '_blank');});
	   }
/****************************Upload File Functions*************************************/



	handleFileInput(files: any) {
	/*	console.log("files==================>",files)*/
		this.fileToUpload = files.item(0);
		this.uploaded=true;
	}


	uploadFileToActivity() {
   if(this.uploaded)
   {
	   this.fileService.uploadFile(this.fileToUpload).subscribe((event:any) =>
	   {

		/*console.log("event=========================>", event);*/

		if(event.type == HttpEventType.UploadProgress)
		 {

			if(event.total!== undefined || event.total!==0)
			 {

				this.percentDone = Math.round(100 * event.loaded / event.total);
				console.log("percentage for progress bar",this.percentDone);
			 }
		}

		else if(event.type == HttpEventType.Response)
		 {

			this.items= [event.body.items[0],... this.items];
		 }

	   }, error => {
		console.log( "error in uploading the file" , error);
	});
   }

	}

	restUpload()
	{
		this.myInputVariable.nativeElement.value = '';

		this.uploaded=false;
	}
}
