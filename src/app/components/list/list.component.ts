import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ItemInterface } from "../../models/item.interface";

@Component({
	selector: "fl-list",
	templateUrl: "./list.component.html",
	styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
	@Input()
	items: Array<ItemInterface>;

	@Output()
	download = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	onDownload(fileId: string, name: string) {
		this.download.emit({ fileId, name });
	}
}
