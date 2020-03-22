import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-renameDialog',
	templateUrl: './renameDialog.component.html'
})
export class RenameDialogComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<RenameDialogComponent>,
		@Inject(MAT_DIALOG_DATA) private data: any
	) {}

	// folderName: string;
	folderName: FormControl = new FormControl('', Validators.required);

	ngOnInit() {
		if (this.data && this.data.element) {
			this.folderName.setValue(this.data.element.name.split('.')[0]);
		}
	}
}
