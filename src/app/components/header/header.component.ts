import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();
  @Input('folders') folders: number;
  @Input('files') files: number;

  constructor() { }

  ngOnInit() {
  }

  search(keyword: string) {
    this.searchEvent.emit(keyword)
  }
}
