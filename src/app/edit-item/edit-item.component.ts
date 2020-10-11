import { Component, OnInit, Output, ViewChild, Input, EventEmitter, ElementRef } from '@angular/core';
import { Item } from '../models/item';
import { APIService } from '../services/api.service';

@Component({
  selector: 'fl-edit-item',
  template: `
    <div class="edit-item-container">
      <mat-form-field appearance="outline">
        <mat-label>Change the item's name</mat-label>
        <input #itemNameInput matInput [value]="name">
      </mat-form-field>
      <div class="action-buttons">
        <button mat-raised-button (click)="cancel()">Cancel</button>
        <button mat-raised-button (click)="create()" [disabled]="!itemNameInput.value">Update</button>
      </div>
    </div>
  `,
  styles: [`
    .edit-item-container{
        margin: 20px;
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 5px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        background: #fff;
    }

    mat-form-field{
        width: 100%;
        font-size: 15px;
    }

    .action-buttons{
        text-align: right;
        padding-bottom: 20px;
    }
  `]
})
export class EditItemComponent implements OnInit {

  @Output('afterCreation') afterCreation: EventEmitter<Item> = new EventEmitter();
  @Output('afterCanceling') afterCanceling: EventEmitter<any> = new EventEmitter();
  @ViewChild('itemNameInput', {static: false}) itemNameInput: ElementRef;
  
  name: string = '';
  private _item: Item;

  @Input('item') 
  set item(value: Item){
    if(value){
      this._item = value;
      this.name = (this._item.folder) ? this._item.name : this._item.name.split('.')[0];
    }
  }
  
  constructor(
    private _service: APIService,
  ) { }

  ngOnInit() {
  }

  cancel(){
    this.afterCanceling.emit();
  }

  create(){
    this._item.name = this.rebuildName();
    this._service.editItem(this._item).subscribe((res: Item) => this.afterCreation.emit(res));
  }

  /**
   * Make sure to build the name of the item in the correct way
   * if it's a folder done check for extension
   * if it's a file get the extension and add it to the new name
   */
  private rebuildName(): string{
    if(this._item.folder) return this.itemNameInput.nativeElement.value;
    else {
      let extension = this._item.name.split('.').pop();
      return `${this.itemNameInput.nativeElement.value}.${extension}`;
    }
  }

}
