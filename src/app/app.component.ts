import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { Store, select } from '@ngrx/store';
import { State, getFolderTree } from './features/folder-explorer/state/folder-explorer.reducer';
import { openFolder } from './features/folder-explorer/state/folder-explorer.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'front-technical-test';
  items: MenuItem[] = [];
  home: MenuItem;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.pipe(select(getFolderTree)).subscribe((folderTree) => {
      console.log(folderTree);
      const [folderRoot, ...tree] = folderTree;
      this.home = { icon: 'pi pi-home', label: folderRoot.name, id: folderRoot.id };
      this.items = tree.map((folder) => ({
        label: folder.name,
        id: folder.id,
        parentId: folder.parentId,
      }));
    });
  }

  onSelectFolder(event) {
    this.store.dispatch(openFolder(event.item));
  }
}
