import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { APIService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../models/item';
import { Location } from '@angular/common';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FileViewComponent } from '../file-view/file-view.component';

@Component({
  selector: 'fl-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  items: Item[] = [];
  parentId: string = '';
  openNewFolderForm: boolean = false;
  openEditItemForm: boolean = false;
  itemToEdit: Item;

  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;
  
  constructor(
    private _service: APIService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.items = [];
      this.parentId = (params['parentId'] == undefined) ? '' : params['parentId'];
      this._service.list(this.parentId).subscribe(data => this.items = data);
    })
  }

  backToPrevious(){
    this._location.back();
  }

  navigateToItem(item: Item){
    if(item.folder) this.navigateToFolder(item.id);
    else this.navigateToFile(item);
  }

  private navigateToFolder(id: string){
    this._router.navigate([''], {queryParams: {'parentId': id}})
  }

  private navigateToFile(item: Item){
    this._bottomSheet.open(FileViewComponent, {data: item});
  }

  openFileChooser(){
    let event = new MouseEvent('click', {bubbles: false});
    this.fileInput.nativeElement.dispatchEvent(event);
  }

  addFiles(event: any){
    let files: any = []
    if(event instanceof FileList){
      files = event;
    }else{
      if (event.target.files) files = event.target.files;
    }
    const formData = new FormData();
    for(let file of files) formData.append('items[]', file);
  
    this._service.uploadFiles(formData, this.parentId).subscribe((res: Item[]) => {
      this.items = [...this.items, ...res];
    });
  }

  deleteItem(item: Item, index: number){
    this._service.delete(item.id).subscribe(() => {
      this.items.splice(index, 1);
    });
  }

  addNewFolderToList(folder: Item){
    this.items.push(folder);
    this.openNewFolderForm = false;
  }

  editItem(item: Item){
    this.itemToEdit = item;
    this.openEditItemForm = true;
  }

  updateItemInTheList(item: Item){
    let index = this.items.findIndex(x => x.id === item.id);
    this.items[index] = item;
    this.openEditItemForm = false;
  }
}
