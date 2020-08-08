import { Component, OnInit } from "@angular/core";
import { FileManagerService } from "./file-manager.service";
import * as fileSaver from "file-saver";
import { TreeNode } from "primeng/components/common/treenode";
@Component({
	selector: "fl-file-manager",
	templateUrl: "./file-manager.component.html",
	styleUrls: ["./file-manager.component.scss"],
})
export class FileManagerComponent implements OnInit {
	showModifButtons = false;
	files: any[];
	selectedFile: any;
	constructor(private fileManagerService: FileManagerService) {}

	async ngOnInit() {
		await this.reload();
	}

	async myUploader(event: any, fileUpload: any) {
		const fileName = event.files[0].name;
		await this.fileManagerService
			.upload({ name: fileName, folder: false })
			.toPromise()
			.then(() => {
				// console.log('file uploaded successfuly');
				fileUpload.clear();
			});
		await this.reload();
		// event.files == files to upload
	}
	async delete() {
		await this.fileManagerService
			.delete(this.selectedFile.id)
			.toPromise()
			.then(() => {
				// console.log('file deleted successfuly');
			});
		await this.reload();
		this.showModifButtons = false;
		this.expandRoot();
	}
	async download() {
		await this.fileManagerService
			.download(this.selectedFile.id)
			.toPromise()
			.then((response) => {
				let blob: any = new Blob([response], {
					type: "text/json; charset=utf-8",
				});
				fileSaver.saveAs(blob, `${this.selectedFile.label}`);
			})
			.catch(() => {
				// console.log('Error downloading the file');
			});
	}
	onSelect() {
		if (String(this.selectedFile) !== "undefined") {
			if (this.selectedFile.data === "file") {
				this.showModifButtons = true;
			} else {
				this.showModifButtons = false;
			}
		}
	}
	async reload() {
		let filesTmp: any = [];
		await this.fileManagerService
			.getFirstItems()
			.toPromise()
			.then((data) => {
				filesTmp = data;
			});
		let files = [];
		for (const file of filesTmp["items"]) {
			if (file.folder) {
				files.push({
					id: file.id,
					collapsedIcon: "pi pi-folder",
					data: "Documents Folder",
					expanded: false,
					expandedIcon: "pi pi-folder-open",
					label: file.name,
				});
			} else {
				files.push({
					id: file.id,
					label: file.name,
					icon: "pi pi-file",
					data: "file",
					parent: undefined,
				});
			}
		}
		this.files = [
			{
				label: "Root",
				children: files,
			},
		];
	}
	expandRoot() {
		this.files.forEach((node) => {
			this.expandRecursive(node, true);
		});
	}
	private expandRecursive(node: TreeNode, isExpand: boolean) {
		node.expanded = isExpand;
		if (node.children) {
			node.children.forEach((childNode) => {
				this.expandRecursive(childNode, isExpand);
			});
		}
	}
}
