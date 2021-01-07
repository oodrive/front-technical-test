import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ItemService } from './../../services/item.service';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss']
})
export class AddFolderComponent implements OnInit {
  @Input('currentFolder') currentFolder: string;
  @Output() folderAdded = new EventEmitter();
  @Output() filesAdded = new EventEmitter();

  files: File[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit() {}

  addFolder(payload: any) {
     this.itemService.createFolder(payload, this.currentFolder).subscribe(
       (response: any) => this.folderAdded.emit(response)
     );
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) { 
      formData.append("file[]", this.files[i]);
    }

    formData.append('parentId', this.currentFolder);

    this.itemService.addFiles(formData, this.currentFolder).subscribe((response: any) => {
      this.filesAdded.emit(response.items);
      this.files = [];
    });
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
