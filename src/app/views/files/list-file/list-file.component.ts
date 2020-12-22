import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  constructor(public fileService: FileService ,private toastr: ToastrService) { }
  items: items
  ngOnInit() {    


    this.listItem()
 
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
      this.toastr.success('File deleted' );
    }, err => {
      console.log(err)
      this.toastr.error(' error File deleted' );
    }
    );
  }
  checkbox: boolean = false
  AddtItem() {

    this.fileService.additems({
      "name": this.name,
      "folder": this.checkbox
    }).subscribe(() => {
      this.listItem()
      this.toastr.success('File Added' );
    }, err => {
      console.log(err)

      this.toastr.error(' error File Added' );
    }
    );
  }
  save(item: items) {
    this.fileService.Patchitems(item.id, { "parentId": item.name }).subscribe(() => {
      this.toastr.success('File Updated' );
    }
    , err => {
      console.log(err)
      this.toastr.error(' error File Updated' );
    })

  }
  edit() {
    this.displayData = !this.displayData
  }

  DownloadFile(id:string){
    this.fileService.DownloadFile(id).subscribe(() => {
      this.toastr.success('File Downloaded' );
    } , err => {
      console.log(err)
      this.toastr.error(' error File Downloaded' );
    })
  }
}



