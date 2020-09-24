import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { saveAs } from 'file-saver';
import { ApiService } from './api.service';
import { FileUploader } from 'ng2-file-upload';
import { ModalService } from './modal.service';

const uri = 'http://localhost:8080/api/items';

@Component({
	selector: 'oo-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	public lists = [];
	public myFiles: string [] = [];
	uploader = new FileUploader({
		url: uri,
	});
	isNaN = isNaN;
	i = 0;
	temp = {
		type: 'success',
		title: 'This is just a title',
		content: 'This is just some content',
		timeOut: 5000,
		showProgressBar: true,
		pauseOnHover: true,
		clickToClose: true,
		animate: 'fromRight',

	};
	// @ts-ignore
	private hasAnotherDropZoneOver: any;

	constructor(private apiService: ApiService,
				private modelService: ModalService) {

		this.uploader.onAfterAddingFile = (fileItem) => {
			this.i++;
			const newFile = {
				creation: new Date(),
				id: this.i,
				// @ts-ignore
				modification: fileItem.file.rawFile.lastModified,
				name: fileItem.file.name,
				isSuccess: false,
				folder: fileItem.alias === 'file' ? false : true,
				listNotUploated: fileItem,
			};
			// @ts-ignore
			this.lists.push(newFile);
		};

		this.uploader.onCompleteAll = () => {
			setTimeout(() => {
				this.uploader.clearQueue();
				// tslint:disable-next-line:ban
				alert('Upload effectuée avec succès');
			}, 1000);

			this.getListItems();
		};
	}

	public fileOverAnother(e: any): void {
		this.hasAnotherDropZoneOver = e;
	}

	public ngOnInit() {
		this.getListItems();
	}

	public getListItems() {
		this.apiService.getList().subscribe((data: any) => {
			this.lists = data.items;
		});
	}

	public download(id: any, fileName: string) {

		this.apiService.downloadFile(id)
			.subscribe(
				(data) => saveAs(data, fileName),
				// tslint:disable-next-line:no-console
				(error) => console.error(error),
			);

	}

	public delete(id: any) {
		this.apiService.delete(id).subscribe(() => {
			this.getListItems();
		}, (error) => {
			// tslint:disable-next-line:no-console
			console.log(error);
		}, () => {
			// tslint:disable-next-line:ban
			alert('Suppression effectuée avec succès');
		});
	}

	public getFileDetails(e: any) {
		// tslint:disable-next-line:prefer-for-of
		for (let i = 0; i < e.target.files.length; i++) {
			this.myFiles.push(e.target.files[i]);
		}
	}

	showConfirmDelete(id: any) {

		this.modelService.confirm(
			'Confirmation',
			'Etes-vous sûr de vouloir supprimer ce fichier?',
			['Oui', 'Non'])
			.subscribe((answer) => {
				if (answer === 'Oui') {
					this.delete(id);
				}
			});

	}
}
