import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { concat, isEmpty } from 'lodash';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';

import { Item } from './model/item';
import { FileService } from '../service/file.service';
import { RenameDialogComponent } from './modals/renameDialog/renameDialog.component';
import { NewFolderDialogComponent } from './modals/newFolderDialog/newFolderDialog.component';

@Component({
	selector: 'fl-file-manager',
	templateUrl: './file-manager.component.html',
	styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit, OnDestroy {
	public items: Item[];
	public itemsRR: Observable<Item[]>;
	public currentRoot: Item;
	public currentPath: string;
	public canNavigateUp = false;
	private subscriptions: Subscription = new Subscription();
	constructor(private fileService: FileService, public dialog: MatDialog) {}

	ngOnInit() {
		this.getAllItems();
	}

	public openMenu(event: MouseEvent, viewChild: MatMenuTrigger) {
		event.preventDefault();
		viewChild.openMenu();
	}

	public openNewFolderDialog() {
		const dialogRef = this.dialog.open(NewFolderDialogComponent);
		dialogRef.afterClosed().subscribe(response => {
			if (response) {
				this.subscriptions.add(
					this.fileService
						.createFolder(response)
						.subscribe(result => (this.items = [result, ...this.items]))
				);
			}
		});
	}

	public getAllItems() {
		this.subscriptions.add(
			this.fileService
				.getItems()
				.subscribe((responses: any): Item[] => (this.items = responses.items))
		);
	}

	public fileChange(files: File[]) {
		this.subscriptions.add(
			this.fileService.uploadItems(files).subscribe(responses => {
				if (responses && responses.items) {
					this.items = concat(this.items, responses.items);
				}
			})
		);
	}

	public downloadFile(item: Item | any) {
		this.subscriptions.add(
			this.fileService.downloadItem(item.id).subscribe(response => {
				const url = URL.createObjectURL(response);
				const dwldLink = document.createElement('a');
				dwldLink.setAttribute('href', url);
				dwldLink.setAttribute('download', item.name);
				dwldLink.style.visibility = 'hidden';
				document.body.appendChild(dwldLink);
				dwldLink.click();
				document.body.removeChild(dwldLink);
			})
		);
	}

	public deleteFile(itemId: string, index: number) {
		this.fileService.delete(itemId).subscribe(response => {
			console.info(response);
			this.items.splice(index, 1);
		});
	}

	public openRenameDialog(element: Item, index: number) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = { element };
		const dialogRef = this.dialog.open(RenameDialogComponent, dialogConfig);
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.renameFile(element, index, result);
			}
		});
	}

	public renameFile(item: Item, index: number, name: string) {
		if (item) {
			const rename: string = item.folder
				? name
				: `${name}.${item.name.split('.').pop()}`;
			this.subscriptions.add(
				this.fileService
					.renameItem(item, rename)
					.subscribe(response => (this.items[index].name = response.name))
			);
		}
	}

	public moveElement(item: any, moveTo: any) {
		if (!isEmpty(item) && !isEmpty(moveTo)) {
			const index = this.items.findIndex(findItem => findItem.id === item.id);
			this.subscriptions.add(
				this.fileService.moveItem(item.id, moveTo.id).subscribe(response => {
					console.info(response);
					this.items.splice(index, 1);
				})
			);
		}
	}

	public navigate(item: Item) {
		if (item.folder) {
			this.currentRoot = item;
			this.updateFileElementQuery();
			this.currentPath = this.pushToPath(this.currentPath, item.name);
			this.canNavigateUp = true;
		}
	}

	private updateFileElementQuery() {}

	private pushToPath(path: string, folderName: string) {
		let p = path ? path : '';
		p += `${folderName}/`;
		return p;
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
