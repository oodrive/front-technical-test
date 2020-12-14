import { Component, OnInit } from '@angular/core';
import { ItemService } from '../app/services/item.service';
import { first } from 'rxjs/internal/operators';
import { Item } from '../app/models/item';
import { mimes } from '../app/models/mimes';
@Component({
	selector: 'oo-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private itemService: ItemService) {	}
	items: Item[] = [];
	file: File;
    files: File[] = [];
	name: string;
	folderName: string;
	selectedItem:Item;
	selected=false;

	ngOnInit() {
		this.getItems();
	}

	getItems() {
		this.itemService.getItems().pipe(first()).subscribe((data: Item[]) => 
				{
					this.items = data;
				},
				(error: Error) => {
					console.log(error);
				});
	}

	download(item:Item) {
		//mimes c'est pour identifier le type de fichier a télécharger
		let variable = mimes.find(value=>value.id===item.name.split('.')[1])
		let type= (variable)?variable.mime:"";
		this.itemService.download(item.id).subscribe((data) => 
				{
					const blob = new Blob([data], { type: type });
					const url = window.URL.createObjectURL(blob);
					window.open(url);
				},
				(error: Error) => {
					console.log(error);
				});
	}

	

	uploadMulti(file:File) {
		this.itemService.upload(file).subscribe(() => 
			{
				this.getItems();
			},
			(error: Error) => {
				console.log(error);
			});
	}
	upload() {
		this.itemService.upload(this.file).subscribe(() => 
			{
				this.getItems();
			},
			(error: Error) => {
				console.log(error);
			});
	}

	createFolder() {
		this.itemService.createFolder(this.folderName).subscribe(() => 
			{
				this.getItems();
			},
			(error: Error) => {
				console.log(error);
			});
	}

	deleteItem(id: string) {
		this.itemService.deleteItem(id).subscribe(() => 
			{
				this.getItems();
			},
			(error: Error) => {
				console.log(error);
			});
	}
    rename(item:Item){
		this.selectedItem=item;
		this.selected=true;
	}
	update() {
		
			let newNameData = this.name;
			if ( !this.selectedItem.folder ) {
				const extension = this.selectedItem.name.split('.');
				newNameData = this.name + '.' + extension[1];
			}
			this.itemService.updateItem(this.selectedItem.id, newNameData).subscribe(() => {
						this.getItems();
						this.selected = false;
					},
					(error: Error) => {
						console.log(error);
					});
		
	}


	
	submit() {
		
		  this.files.forEach(file => this.uploadMulti(file));
		
	  }
	
	
	
	onSelect(event: any) {
		console.log(event);
		this.files.push(...event.addedFiles);
		console.log(this.files);
	  }
	  onRemove(event: any) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	  }
		

}
