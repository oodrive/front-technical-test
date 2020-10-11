import { Component, Inject } from '@angular/core';
import {  MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Item } from '../models/item';
import { APIService } from '../services/api.service';

@Component({
  selector: 'fl-file-view',
  template: `
    <div>
      <mat-list>
          <mat-list-item>
              <p mat-line> Name </p>
              <h4 mat-line>{{ item.name }}</h4>
          </mat-list-item>
          <mat-list-item>
              <p mat-line> Type </p>
              <h4 mat-line>{{extension() | uppercase}}</h4>
          </mat-list-item>
          <mat-list-item>
              <p mat-line> Created </p>
              <h4 mat-line>{{ item.creation|date }}</h4>
          </mat-list-item>
          <mat-list-item>
              <p mat-line> Updated </p>
              <h4 mat-line>{{ item.modification|date }}</h4>
          </mat-list-item>
      </mat-list>
      <div style="text-align: center;">
          <button mat-raised-button color="primary" (click)="download()">Download <mat-icon>cloud_download</mat-icon></button>
      </div>
    </div>
  `,
  styles: [`
    p{
      color: #00000061;
      font-size: 13px !important;
    }
  `]
})
export class FileViewComponent {

  constructor(
    private _service: APIService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public item: Item,
  ) { }

  download(){
    this._service.downloadFile(this.item.id).subscribe(blob => {
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl
      a.download = this.item.name;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  extension(){
    return this.item.name.split('.').pop();
  }

}
