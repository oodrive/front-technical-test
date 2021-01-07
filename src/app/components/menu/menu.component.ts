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

  @Output() unselectedEvent = new EventEmitter();
  @Output() itemDeleted = new EventEmitter();

  constructor(
    private itemService: ItemService, 
    private router: Router
  ) {}

  ngOnInit() {
  }

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
}
