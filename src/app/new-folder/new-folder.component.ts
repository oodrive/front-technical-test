import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { Item } from '../models/item';
import { APIService } from '../services/api.service';

@Component({
  selector: 'fl-new-folder',
  template: `
    <div class="new-folder-container">
      <mat-form-field appearance="outline">
        <mat-label>New folder name</mat-label>
        <input #folderNameInput matInput>
      </mat-form-field>
      <div class="action-buttons">
        <button mat-raised-button (click)="cancel()">Cancel</button>
        <button mat-raised-button (click)="create()" [disabled]="!folderNameInput.value">Create</button>
      </div>
    </div>
  `,
  styles: [`
    .new-folder-container{
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
export class NewFolderComponent implements OnInit {

  @Output('afterCreation') afterCreation: EventEmitter<Item> = new EventEmitter();
  @Output('afterCanceling') afterCanceling: EventEmitter<any> = new EventEmitter();
  @ViewChild('folderNameInput', {static: false}) folderNameInput: ElementRef;
  @Input('parentId') parentId: string  = '';

  constructor(
    private _service: APIService,
  ) { }

  ngOnInit() {}

  cancel(){
    this.afterCanceling.emit();
  }

  create(){
    let item: Item = {
      id: '',
      name: this.folderNameInput.nativeElement.value,
      folder: true,
    };
    this._service.createFolder(item, this.parentId).subscribe((res: Item) => this.afterCreation.emit(res));
  }
}
