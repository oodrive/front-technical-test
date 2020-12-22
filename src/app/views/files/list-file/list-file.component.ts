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
  item: items
  name: string
  displayData: boolean = false
  add: boolean = false
  codeerr: boolean = false
  _toggleSidebar(item: any, add: string) {
    if (add == 'add') {
      this.add = true
    } else {
      this.add = false

    }
    this._opened = !this._opened;
    this.item = item
    console.log(this.item)
  }
  constructor(public fileService: FileService) { }
  items: items
  ngOnInit() {

    this.listItem()
    this.AddtItem()

  }
  listItem() {
    this.fileService.getListItems().subscribe((res: any) => {
      console.log(res)
      this.items = res.items
    });

  }
  DeletItem(id: string) {
    this.fileService.deleteitems(id).subscribe(() => {
      this.listItem()
    }
    );
  }
  checkbox: boolean = false
  AddtItem() {
    console.log(this.name)
    console.log(this.checkbox)
    this.fileService.additems({
      "name": this.name,
      "folder": this.checkbox
    }).subscribe(() => {
      this.listItem()
    }
      , err => {
        console.log(err)
      }
    );
  }
  save() {
    console.log(this.name)

  }
  edit() {
    this.displayData = !this.displayData
  }


}



