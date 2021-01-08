import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ItemService } from './../../services/item.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private itemService: ItemService, private toastr: ToastrService) { }

  ngOnInit() {}

  addFolder(form: any) {
     this.itemService.createFolder(form.value, this.currentFolder).subscribe(
       (response: any) => {
         this.folderAdded.emit(response)
         form.reset();
        },
        (error: any) => {
          this.toastr.error('Name already used');          
        }
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
