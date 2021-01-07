import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input('items') items: any;
  @Output() selectedEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  itemSelected(item: any) {
    this.selectedEvent.emit(item)    
  }
}
