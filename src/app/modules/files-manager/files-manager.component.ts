import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatMenuTrigger } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AutoUnsubscribe } from '../../core/decorators/auto-unsubscribe';
import { Helper } from '../../core/services/helper.service';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { Item } from './models/item';
import { FilesManagerService } from './services/files-manager.service';

@AutoUnsubscribe() // Deocrator used for unsubscribe all obsrvable after each call
@Component({
  selector: 'fl-files-manager',
  templateUrl: './files-manager.component.html',
  styleUrls: ['./files-manager.component.scss']
})
export class FilesManagerComponent implements OnInit {

  public items: Item[];

  public selectedItem: Item | null;

  private _currentItem: Item | null;

  @ViewChild('downloadLink', { static: false })
  private downloadLink: ElementRef;

  @ViewChild(MatMenuTrigger, { static: false })
  contextMenu: MatMenuTrigger;

  public contextMenuPosition: any;

  /**
   * Used for search an item with the auto complete
   */
  public filteredItems: Observable<Item[]>;

  public itemFormControl: FormControl;

  /**
   * Used to store the path of visited folders
   */
  public breadcrumbList: Item[];

  constructor(private readonly _filesManagerService: FilesManagerService,
    private readonly _helper: Helper,
    private readonly _dialog: MatDialog) { }

  ngOnInit() {
    this._initData();
    this.selectItem();
    this._getAllItems();
    this.initItemAutoComplete();
  }

  /**
   * Get the list of all items
   * @param parentId
   */
  private _getAllItems(parentId?: string) {
    this._filesManagerService.getItems(parentId).subscribe(
      (data: any) => {
        this.items = data.items;
        this.initItemAutoComplete();
      },
      (error) => this._helper.handleErrors(error)).unsubscribe;
  }

  /**
    * Upload Mutiple files
   * @param event : file value
   */
  public upload(event: any) {
    const files = event && event.target ? event.target.files : event;
    const parentId = this._currentItem && this._currentItem.id ? this._currentItem.id : undefined;
    this._filesManagerService.upload(files, parentId).subscribe(
      (data) => {
        if (data) {
          this._reloadData();
          this._helper.trace('upload files done');
        }
      },
      (error) => this._helper.handleErrors(error));
  }

  /**
    * Download the selected File
    */
  public download() {
    if (this.selectedItem && this.selectedItem.id) {
      this._filesManagerService.download(this.selectedItem.id).subscribe((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = this.downloadLink.nativeElement;
        link.href = url;
        link.download = this.selectedItem ? this.selectedItem.name : 'file';
        link.click();
        window.URL.revokeObjectURL(url);
      }, (error) => {
        this._helper.handleErrors(error, 'An error occurred when downlaoding the file');
      });
    }
  }

  /**
   * Create new item (Folder | Empty File)
   * @param name : item name
   * @param isForlder : boolean for define type of item (By default folder)
   * @param parentId : the parentId (path) where we xant to save the new item
   */
  public create(name: string, isForlder: boolean, parentId: string) {
    this._filesManagerService.create(name, isForlder, parentId).subscribe(
      (data) => {
        if (data) {
          this._reloadData();
          this._helper.trace(`create new ${isForlder ? 'Folder' : 'File'} (${data.name}) done`);
        }
      },
      (error) => this._helper.handleErrors(error));
  }

  /**
  * delete item bu the given itemId
  * @param parentId
  */
  public delete(itemId: string) {
    this._filesManagerService.delete(itemId).subscribe(
      () => this._reloadData(),
      (error) => this._helper.handleErrors(error));
  }

  /**
  * Rename item
  * @param parentId
  */
  public rename(item: Item, name: string) {
    this._filesManagerService.renameItem(item, name).subscribe(
      () => this._reloadData(),
      (error) => this._helper.handleErrors(error));
  }

  /**
   * Use to move items to a another parent location
   * @param item : item to be moved
   * @param parent :the parent where we are going to move the item
   */
  public moveItem(item: any, parent: any) {
    if (item && parent) {
      this._filesManagerService.moveItem(item.id, parent.id).subscribe(
        () => {
          this._reloadData();
          this._helper.trace(`moving the item done`);
        }, (error) => this._helper.handleErrors(error));
    }
  }
  /**
   * Refresh the Ui and ata after each call
   */
  private _reloadData() {
    const itemId = this._currentItem ? this._currentItem.id : undefined;
    this._getAllItems(itemId);
  }
  /**
   * Navigate to the root
   */
  public navigateToMain() {
    this.selectedItem = null;
    this.breadcrumbList = [];
    this._getAllItems();
  }

  /**
   * Navigate inside forlders
   * @param item
   */
  public navigateToChild(item: Item) {
    if (item && item.folder) {
      this.selectedItem = null;
      this.breadcrumbList.push(item);
      this._getAllItems(item.id);
      this._currentItem = item;
    }
  }

  /**
   * Navigate inside forlders
   * @param items : items list
   * @param index : index of the selected item
   */
  public navigateToParent(items: Item[], index: number) {
    this.breadcrumbList.splice(index + 1, this.breadcrumbList.length - 1);
    if (items[index] && items[index].folder) {
      this._getAllItems(items[index].id);
      this.selectedItem = null;
      this._currentItem = items[index];
    }
  }
  /**
   * Init all decalred attributes
   */
  private _initData() {
    this.contextMenuPosition = { x: '0px', y: '0px' };
    this.items = [];
    this.breadcrumbList = [];
    this.itemFormControl = new FormControl('');
  }

  /**
   * Store the selected Item whenthe user clic inside the itemBox
   * @param item : item (Foldr | File)
   */
  public selectItem(item?: Item) {
    this.selectedItem = item ? item : null;
  }

  /**
   * used for open the menu select when the user click right
   * @param event :mouse event
   * @param item : item selected
   */
  public onContextMenu(event: MouseEvent, item: Item) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
    this.selectedItem = item;
  }

  /**
   * Open new modal with form for create or rename
   * @param item : optional when the operation is create
   */
  public openDialog(item?: Item) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const title = item ? 'Renommer' : 'Ajouter un nouveau item';
    // list of all parent
    const items = this.items && this.items.length > 0 ? this.items.filter((item) => item.folder) : null;
    const currentItem = this._currentItem;
    dialogConfig.data = { title, items, item, currentItem };
    const dialogRef = this._dialog.open(ModalFormComponent, dialogConfig);

    // After Dialg closed fetch the result
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (!result.parentId && this._currentItem) {
          result.parentId = this._currentItem.id;
        }
        item ? this.rename(item, result.name) : this.create(result.name, result.folder, result.parentId);
      }
    });
  }

  /**
   * Init the autocomplete field with the list of items
   */
  initItemAutoComplete() {
    this.filteredItems = this.itemFormControl.valueChanges
      .pipe(
        startWith(''),
        map((value) => typeof value === 'string' ? value : value.name),
        map((name) => name ? this._filter(name) : this.items.slice()),
      );
  }

  private _filter(name: string): Item[] {
    const filterValue = name.toLowerCase();
    return this.items.filter((option) => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
