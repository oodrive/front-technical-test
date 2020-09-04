import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FileManagerService } from '../../services/file-manager.service';

@Component({
	selector: 'fl-item-details',
	templateUrl: './item-details.component.html',
	styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {

	itemId: string;
	item: Item;
	public listItemsDetail: Item[];
	constructor(private route: ActivatedRoute,
			  private router: Router,
			  private fileService: FileManagerService) { }

	ngOnInit() {
	  this.route.params.subscribe((i) => {
		  this.itemId = i.id;
	  });
	  this.getListItems(this.itemId);
}

	getListItems(parentId?: string) {
		this.fileService.retrieveItems(parentId).subscribe((data: any) => {
			if (data) {
				this.listItemsDetail = data.items;
			}
		});
	}

	goBack() {
		this.router.navigateByUrl('/items');
		this.getListItems();
	}

}
