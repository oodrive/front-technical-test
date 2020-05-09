import { Component, OnInit, Input } from '@angular/core';
import { File } from 'src/app/core/models/file.model';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {
  textFilter: string;
  folderList: File[] = [];
  fileList: File[] = [];

  @Input() set items(files: File[]) {
    if (files) {
      this.folderList = files.filter((file) => file.folder);
      this.fileList = files.filter((file) => !file.folder);
    }
  }
  constructor() {}

  ngOnInit(): void {}

  onSelectFolder(item: File) {}

  onSelectFile(item: File) {}

  getExtensions(item: File): string {
    const extension = item.name.split('.').pop();
    let type: string;
    switch (extension) {
      case 'mp3':
        type = 'music';
        break;
      case 'mp4':
        type = 'video';
        break;
      case 'pdf':
        type = 'pdf';
        break;
      case 'zip':
        type = 'archive';
        break;
      case 'ts':
      case 'html':
      case 'scss':
        type = 'code';
        break;
      case 'doc':
      case 'docx':
        type = 'word';
        break;
      case 'xls':
      case 'xlsx':
        type = 'excel';
        break;
      default:
        type = 'alt';
    }
    return `fa-file-${type}`;
  }
}
