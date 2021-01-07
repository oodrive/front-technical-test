import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input('selectedItem') selectedItem: any;
  @Output() unselectedEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  closeMenu() {
    this.unselectedEvent.emit();
  }
}
