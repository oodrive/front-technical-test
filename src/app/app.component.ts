import { Component } from '@angular/core';
import { FilesService } from './services/files.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'oo-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	root: any;
	myFiles: string [] = [];
	uploadForm = new FormGroup({
		file: new FormControl('', [Validators.required]),
	});

	constructor (public filesService: FilesService) {}

	ngOnInit() {
		this.getRoots();
	}

	getRoots() {
		this.filesService.getRootsS().subscribe((data) => {
			this.root = data;
			console.log(this.root);
		});
	}

	get f() {
		return this.uploadForm.controls;
	}

	onFileChange(event: any) {
		// tslint:disable-next-line: prefer-for-of
		for (let i = 0; i < event.target.files.length; i++) {
			this.myFiles.push(event.target.files[i]);
		}
	}

	submitFiles() {
		const formData = new FormData();

		// tslint:disable-next-line: prefer-for-of
		for (let i = 0; i < this.myFiles.length; i++) {
			formData.append('file[]', this.myFiles[i]);
		}
		this.filesService.uploadFiles(formData).subscribe((res: any) => {
			console.log(res);
			console.log('Uploaded Successfully.');
			this.getRoots();
			this.myFiles = [];
		});
	}

	deleteFile(idFile: any) {
		this.filesService.deleteFile(idFile).subscribe(() => {
			this.getRoots();
		});
	}
}
