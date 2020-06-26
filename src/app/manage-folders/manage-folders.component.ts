import { Component, OnInit } from '@angular/core';
import {Item } from '../models/item.model';
import { ItemService } from '../services/item.service';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'fl-manage-folders',
  templateUrl: './manage-folders.component.html',
  styleUrls: ['./manage-folders.component.css']
})
export class ManageFoldersComponent implements OnInit {
	folders : Item[] = [];
	constructor(private itemService : ItemService,
	private router : Router,
	private route : ActivatedRoute) { }

  ngOnInit() {
	this.route.params.subscribe(
		params =>{
			if (params.parentId){
				this.getItems(params.parentId);
			}
			else{
				this.getItems();
			}
		}
	)
	  
	  
  }

  getItems(parentId?:string){
	this.itemService.getItems(parentId)
	.subscribe(arg => this.folders = arg.items);
  }

  folderSelected(folder:Item){
	this.router.navigate([`folders/${folder.id}`])
  }

}
