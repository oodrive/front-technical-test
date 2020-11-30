import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { first } from 'rxjs/internal/operators';
import { Item } from '../models/item';

@Component({
	selector: 'oo-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private itemService: ItemService) {	}
	items: Item[] = [];
	fileData: File;
	nameData: string;
	folderNameData: string;
	fileOrFolderData: string;
	ngOnInit() {
		this.loadItems();
	}
	loadItems() {
		this.itemService.read()
			.pipe(first())
			.subscribe(
				(data: Item[]) => {
					this.items = data;
				},
				(error: Error) => {
					console.log(error);
				});
	}
	download(id: string) {
		this.itemService.download(id)
			.subscribe(
				(data) => {
					const blob = new Blob([data], { type: 'text/csv' });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				},
				(error: Error) => {
					console.log(error);
				});
	}
	fileProgress(fileInput: any) {
		this.fileData = fileInput.target.files[0] as File;
	}
	nameProgress(nameInput: any) {
		this.nameData = nameInput.target.value;
	}
	folderNameProgress(folderNameInput: any) {
		this.folderNameData = folderNameInput.target.value;
	}
	fileOrFolderProgress(fileOrFolderData: any) {
		this.fileOrFolderData = '';
		this.fileOrFolderData = fileOrFolderData.target.value;
	}
	upload() {
		this.itemService.upload(this.fileData).subscribe(
			() => {
				this.loadItems();
			},
			(error: Error) => {
				console.log(error);
			});
	}
	createFolder() {
		this.itemService.createFolder(this.folderNameData).subscribe(
			() => {
				this.loadItems();
			},
			(error: Error) => {
				console.log(error);
			});
	}
	delete(id: string) {
		this.itemService.delete(id)
			.subscribe(
			() => {
				this.loadItems();
			},
			(error: Error) => {
				console.log(error);
			});
	}
	rename() {
		const selectedItem = this.items.find((Item) => Item.name === this.fileOrFolderData);
		if ( !selectedItem ) {
			alert('Select a file or folder');
		} else {
			let newNameData = this.nameData;
			if ( !selectedItem.folder ) {
				const extension = this.fileOrFolderData.split('.');
				newNameData = this.nameData + '.' + extension[1];
			}
			this.itemService.rename(selectedItem.id, newNameData)
				.subscribe(
					() => {
						this.loadItems();
						this.fileOrFolderData = '';
					},
					(error: Error) => {
						console.log(error);
					});
		}
	}
}
