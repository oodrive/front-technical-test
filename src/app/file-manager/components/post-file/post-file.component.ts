import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileManagerService } from '../../services/file-manager.service';
import { Item } from '../../models/item.model';

@Component({
	selector: 'fl-post-file',
	templateUrl: './post-file.component.html',
	styleUrls: ['./post-file.component.css'],
})
export class PostFileComponent implements OnInit {

	@Input() folerSelected: Item;
	public folderForm: FormGroup;
	public submitted = false;
	private fileToSave: any = {};
	constructor(public activeModal: NgbActiveModal,
				private fileService: FileManagerService,
				private toastService: ToastService) { }

	ngOnInit() {
		this.initForm();
		if (this.folerSelected) {
			this.updateForm(this.folerSelected);
		}
	}

	get f() {
		return this.folderForm.controls;
	}

	public initForm() {
		return (this.folderForm = new FormGroup({
			name:  new FormControl('', [Validators.required]),
		}));
	}

	public updateForm(entity: Item) {
		this.folderForm.patchValue({
			name: entity.name,
		});
	}
	public onSubmit() {
		this.submitted = true;
		if (this.folderForm.value.name) {
			if (this.folerSelected) {
				this.fileService.renameItem(this.folderForm.value.name, this.folerSelected.id).subscribe((data) => {
					if (data) {
						this.activeModal.close(data);
					}
				});
			} else {
				this.fileToSave.name = this.folderForm.value.name ;

				this.fileService.createFolder(this.fileToSave.name).subscribe((data: any) => {
					if (data) {
						this.activeModal.close(data);
					}
				});
				this.toastService.success('Folder Created successfully!');
			}

		} else {
			this.toastService.error('Something went wrong!');
		}
	}

}
