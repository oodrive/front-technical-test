import { Component, OnInit } from "@angular/core";
import { DriveService } from "./services/drive.service";
import { ItemInterface } from "./models/item.interface";
import { downLoadFile } from "./helpers/drive.helper";

@Component({
	selector: "oo-app",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	items: Array<ItemInterface> = [];
	toUpload: any;
	constructor(private driveService: DriveService) {}

	getItems() {
		this.driveService.getItems().subscribe((files: any) => {
			this.items = files.items;
		});
	}

	ngOnInit() {
		this.getItems();
	}

	onUpload(selectedFiles: FileList) {
		for (let i = 0; i < selectedFiles.length; i++) {
			this.toUpload = selectedFiles.item(i);
			this.driveService.uploadItems(this.toUpload).subscribe((value) => {
				console.log(value);
				this.getItems();
			});
		}
	}

	onDownload(fileId: string, name: string) {
		if (fileId) {
			this.driveService.downloadItem(fileId).subscribe((value: any) => {
				downLoadFile(value, name);
			});
		}
	}
}
