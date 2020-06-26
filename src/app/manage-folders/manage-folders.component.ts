import { Component, OnInit } from '@angular/core';
import {Item } from '../models/item.model';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'fl-manage-folders',
  templateUrl: './manage-folders.component.html',
  styleUrls: ['./manage-folders.component.css']
})
export class ManageFoldersComponent implements OnInit {
	responsiveOptions = [
		{
			breakpoint: '1024px',
			numVisible: 3,
			numScroll: 3
		},
		{
			breakpoint: '768px',
			numVisible: 2,
			numScroll: 2
		},
		{
			breakpoint: '560px',
			numVisible: 1,
			numScroll: 1
		}
	];

	folders : Item[] = [];
  constructor(private itemService : ItemService) { }

  ngOnInit() {
	  this.itemService.getItems()
		  .subscribe(arg => this.folders = arg.items);
	  
  }

}
