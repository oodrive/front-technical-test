import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from './../../services/item.service';

@Component({
  selector: 'fl-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  items: [];
  displayedItems: any;
  currentFolder: any;
  selectedItem: any = null;

  constructor(private itemService: ItemService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.items = [];
    this.displayedItems = [];

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.currentFolder = id;
      this.fetchItems();
    });
  }

  fetchItems() {
    this.itemService.getItems(this.currentFolder).subscribe(
      (response: any) => {      
        this.items = response.items;
        this.displayedItems = response.items;
      }
    );
  }

  recieveItemSelected(item: any) {
    console.log('selected item', item);
    
    this.selectedItem = item;
  }

  recieveItemUnselected() {
    this.selectedItem = null;
  }

  recieveSearch(keyword: string) {
    this.displayedItems = (keyword)? this.items.filter((item: any) => item.name.includes(keyword)) : this.items;
  }
}
