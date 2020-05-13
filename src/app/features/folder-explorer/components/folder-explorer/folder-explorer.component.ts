import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/core/services/file/file.service';
import { File } from 'src/app/core/models/file.model';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import {
  State,
  getFolderTree,
  getFileList,
  getCopiedFile,
} from '../../state/folder-explorer.reducer';
import {
  openFolder,
  getFiles,
  renameFile,
  addFolder,
  copyFile,
  pasteFile,
  removeFile,
} from '../../state/folder-explorer.actions';

@Component({
  selector: 'app-folder-explorer',
  templateUrl: './folder-explorer.component.html',
  styleUrls: ['./folder-explorer.component.scss'],
})
export class FolderExplorerComponent implements OnInit {
  currentFolder: File;

  textFilter: string;
  folderList: File[] = [];
  fileList: File[] = [];

  selectedItem: File;
  displayedActions: MenuItem[] = [];

  defaultActions: MenuItem[] = [
    {
      label: 'Create Folder',
      icon: 'fal fa-folder-plus',
      command: (folder) => {
        this.createFolder();
      },
    },
    {
      label: 'Import Files',
      icon: 'fal fa-file-upload',
    },
    {
      label: 'Import Folders',
      icon: 'fal fa-folder-upload',
    },
    {
      label: 'Paste',
      disabled: true,
      command: () => this.pasteFile(),
    },
  ];
  fileActions: MenuItem[] = [
    {
      label: 'Download',
      icon: 'fal fa-file-download',
      command: (file) => this.downloadfile(file),
    },
    {
      label: 'Rename',
      icon: 'fal fa-edit',
      command: (file) => this.renameItem(file),
    },
    {
      label: 'Copy',
      icon: 'fal fa-file-export',
      command: (file) => this.copyFile(file),
    },
    {
      label: 'Remove',
      icon: 'fal fa-trash-alt',
      command: (file) => this.removeFile(file),
    },
  ];
  folderActions: MenuItem[] = [
    {
      label: 'Open Folder',
      icon: 'fal fa-folder-open',
      command: (folder: File) => this.openFolder(folder),
    },
    {
      label: 'Rename',
      icon: 'fal fa-edit',
      command: (file) => this.renameItem(file),
    },
    {
      label: 'Copy',
      icon: 'fal fa-arrow-right',
      command: (file) => this.copyFile(file),
    },
    {
      label: 'Remove',
      icon: 'fal fa-trash-alt',
      command: (file) => this.removeFile(file),
    },
  ];

  renameDialog: boolean;
  creationDialog: boolean;
  newName: string;

  copiedFile: File;

  constructor(private fileService: FileService, private store: Store<State>) {}

  ngOnInit() {
    this.store.pipe(select(getFileList)).subscribe((items) => {
      this.displayedActions = this.defaultActions;
      this.folderList = items.filter((file) => file && file.folder);
      this.fileList = items.filter((file) => file && !file.folder);
    });
    this.store
      .pipe(
        select(getFolderTree),
        map((folders: File[]) => {
          // current folder is the last folder in the folder tree
          this.currentFolder = folders[folders.length - 1];
          return this.currentFolder;
        })
      )
      .subscribe((folder: File) => this.store.dispatch(getFiles(folder)));
    this.store.pipe(select(getCopiedFile)).subscribe((copiedfile: File) => {
      this.copiedFile = copiedfile;
      const pasteAction = this.defaultActions.find((action) => action.label === 'Paste');
      // TODO if copied file in the same folder, paste action is disabled
      pasteAction.disabled = !copiedfile;
    });
  }

  onSelectFolder(item: File) {
    if (this.selectedItem && this.selectedItem.id === item.id) {
      this.selectedItem = null;
      this.displayedActions = this.defaultActions;
    } else {
      this.selectedItem = item;
      this.displayedActions = this.folderActions;
    }
  }

  onSelectFile(item: File) {
    if (this.selectedItem && this.selectedItem.id === item.id) {
      this.selectedItem = null;
      this.displayedActions = this.defaultActions;
    } else {
      this.selectedItem = item;
      this.displayedActions = this.fileActions;
    }
  }

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

  downloadfile(file: File) {
    this.fileService.downloadFile(file).subscribe(
      (data) => console.log('download success'),
      (err) => console.log('download fail')
    );
  }

  openFolder(folder) {
    this.store.dispatch(openFolder({ ...folder, parentId: this.currentFolder.id }));
  }

  renameItem(file: File) {
    this.renameDialog = true;
    this.newName = file.name;
  }

  confirmRename() {
    if (this.newName) {
      this.renameDialog = false;
      this.selectedItem = { ...this.selectedItem, name: this.newName };
      this.store.dispatch(renameFile(this.selectedItem));
    }
  }

  moveitem() {
    this.fileService.moveFile(this.selectedItem);
  }

  createFolder() {
    this.creationDialog = true;
    this.newName = '';
  }

  confirmCreation() {
    if (this.newName) {
      this.creationDialog = false;
      this.store.dispatch(addFolder({ parentFolder: this.currentFolder, name: this.newName }));
    }
  }

  copyFile(file: File) {
    this.store.dispatch(copyFile({ file }));
  }

  pasteFile() {
    this.store.dispatch(pasteFile({ ...this.copiedFile, parentId: this.currentFolder.id }));
  }

  removeFile(file: File) {
    this.store.dispatch(removeFile(file));
  }
}
