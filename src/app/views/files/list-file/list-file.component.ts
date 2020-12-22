import { Component, OnInit } from '@angular/core';
import { items } from '../../../models/items.interface';
import { FileService } from '../../../services/_services/file.service.ts.service';

@Component({
  selector: 'fl-list-file',
  templateUrl: './list-file.component.html',
  styleUrls: ['./list-file.component.css']
})
export class ListFileComponent implements OnInit {
  private _opened: boolean = false;
  item:any
  _toggleSidebar(item:any) {
       this._opened = !this._opened;
       this.item=item
       console.log( this._opened)
  }
  constructor(public fileService: FileService) { }
  items:items
  ngOnInit() {

    this.listItem()
  }
  listItem() {
    this.fileService.getListItems().subscribe((res:any) => {
      console.log(res)
       this.items=res.items
    });

  }
  
 

}



