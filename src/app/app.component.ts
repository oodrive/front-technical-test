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
	upload() {
		this.itemService.upload(this.fileData).subscribe(
			(data) => {
				this.loadItems();
			},
			(error: Error) => {
				console.log(error);
			});
	}
	delete(id: string) {
		this.itemService.delete(id)
			.subscribe(
			(data) => {
				this.loadItems();
			},
			(error: Error) => {
				console.log(error);
			});
	}
}
