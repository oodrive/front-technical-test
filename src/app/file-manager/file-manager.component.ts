import { Component, OnInit } from '@angular/core';
import { Item } from './models/item.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './services/toast.service';
import { FileManagerService } from './services/file-manager.service';
import { PostFileComponent } from './components/post-file/post-file.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'fl-file-manager',
	templateUrl: './file-manager.component.html',
	styleUrls: ['./file-manager.component.css'],
})
export class FileManagerComponent implements OnInit {
	public listItems: Item[];
	public listNameFolder: any = [];
	public folderForm: FormGroup;
	constructor(private fileService: FileManagerService,
				private toastService: ToastService,
				private modalService: NgbModal,
				private router: Router) { }

	ngOnInit() {
		this.initForm();
		this.getListItems();
	}

	get f() {
		return this.folderForm.controls;
	}

	public initForm() {
		return (this.folderForm = new FormGroup({
			moveTo:  new FormControl('' ),
		}));
	}

	getListItems(parentId?: string) {
		this.fileService.retrieveItems(parentId).subscribe((data: any) => {
			if (data) {
				this.listItems = data.items;
			}
		});
	}

	deleteItem(itemId: string, index: number) {
		this.fileService.deleteItem(itemId).subscribe();
		this.listItems.splice(index, 1);
		this.toastService.delete('File deleted successfully !!!');
	}

	openModalCreateFolder(): void {
		this.modalService.open(
			PostFileComponent, {
				size: 'lg',
				backdrop: 'static',
			}).result.then((result) => {
				this.listItems = [result, ...this.listItems];
			}).catch((res) => { console.log('res', res); });

	}

	openModalRenameFolder(item: any, index: number) {
		const modalRef = this.modalService.open(
			PostFileComponent, {
				size: 'lg',
				backdrop: 'static',
			});
		modalRef.componentInstance.folerSelected = item;
		modalRef.result.then((result) => {
			this.listItems[index].name = result.name;
		}).catch((res) => { console.log('res', res); });
	}

	downloadItem(item: any) {
		this.fileService.downloadFile(item.id).subscribe((data ) => {
			if (data) {
				const a = document.createElement('a');
				const objectUrl = URL.createObjectURL(data);
				a.href = objectUrl;
				a.download = item.name;
				a.click();
				URL.revokeObjectURL(objectUrl);
			}

		}), (error: any) => console.log(error);

	}

	onFileSelected(events: any) {
		const fileList: [FileList] = events.target.files;
		this.fileService.uploadFiles(fileList).subscribe((data: any) => {
			if (data) {
				this.listItems = this.listItems.concat(data.items);
			}
		});
	}

	navigateInsideFolder(item: Item) {
		this.router.navigate(['/items', item.id]);
	}


}
