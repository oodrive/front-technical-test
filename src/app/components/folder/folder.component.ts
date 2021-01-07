import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from './../../services/item.service';

@Component({
  selector: 'fl-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  items: any;
  displayedItems: any;
  currentFolder: any;
  selectedItem: any = null;
  folders: any;

  constructor(private itemService: ItemService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.items = [];
    this.displayedItems = [];
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.currentFolder = id;
      this.fetchItems();
      this.selectedItem = null;
    });
  }

  fetchItems() {
    this.itemService.getItems(this.currentFolder).subscribe(
      (response: any) => {      
        this.items = response.items;
        this.displayedItems = response.items;

        this.getFolders();
      }
    );
  }

  recieveItemSelected(item: any) {    
    this.selectedItem = item;
  }

  recieveItemUnselected() {
    this.selectedItem = null;
  }

  recieveSearch(keyword?: string) {
    this.displayedItems = (keyword)? this.items.filter((item: any) => item.name.includes(keyword)) : this.items;
  }

  recieveItemDeleted(item: any) {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
    this.selectedItem = null;

    this.getFolders();
  }

  getFolders() {
    this.folders = this.items.filter((item: any) => item.folder); 
    this.recieveSearch();
  }

  recieveItemAdded(item: any) {
    this.items.push(item);

    this.getFolders();
  }

  recieveFiles(item: any) {
    const newArray = [...this.items, ...item];
    this.items = newArray;

    this.getFolders();
  }
}
