import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from './../../services/item.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input('selectedItem') selectedItem: any;
  @Input('currentFolder') currentFolder: any;
  @Input('folders') folders: any;
  
  @Output() unselectedEvent = new EventEmitter();
  @Output() itemDeleted = new EventEmitter();
  @Output() nameChanged = new EventEmitter<any>();
  @Output() itemMoved = new EventEmitter();

  folderName: string;

  constructor(
    private itemService: ItemService, 
    private router: Router
  ) {}

  ngOnInit() { }

  closeMenu() {
    this.unselectedEvent.emit();
  }

  navigate() {
    this.router.navigate(['folders', this.selectedItem.id]);
  }

  delete() {
    this.itemService.delete(this.selectedItem.id).subscribe(
      () => this.itemDeleted.emit(this.selectedItem)
    );
  }

  getFoldersList() {
    return this.folders.filter((folder: any) => folder.id !== this.selectedItem.id)
  }

  updateItemName(f: any) {
    this.itemService.update(this.selectedItem.id, f.value).subscribe(response => {
      this.nameChanged.emit(response);
    })   
  }

  updateItemLocation(f: any) {
    this.itemService.update(this.selectedItem.id, f.value).subscribe((response: any) => {
      this.itemMoved.emit(response.id)
    })
  }
}
