import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../../model/item';
import { ItemsService } from '../../service/items.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Sort } from '@angular/material/sort';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'oo-liste-items',
  templateUrl: './liste-items.component.html',
  styleUrls: ['./liste-items.component.css']
})
export class ListeItemsComponent implements OnInit, OnDestroy {

  public dataSource: Item[] = [];
  private counterSubscription: Subscription;
  public loader = false;
  public sortedData: Item[];


  constructor(
    private itemsService: ItemsService,
    public toastr: ToastrService
    ) {
      this.sortedData = this.dataSource.slice();
    }
  
  ngOnInit() {
    this.getItems();
  }

  public getItems() {
    this.loader = true;
    this.counterSubscription = this.itemsService.getItems()
      .pipe(delay(1000))
      .subscribe( (dataItems: Item[]) => {
        this.dataSource = dataItems;
        this.loader = false;
    },() => this.loader = false);
  }

  public downLoadFile(id: string): void {
    this.counterSubscription = this.itemsService.downLoadFile(id)
        .subscribe(
          (data) => {
            this.toastr.success(data.toString());
            this.getItems();
          },
          () => this.toastr.error('erreur de téléchargement'),
          () => this.toastr.success('téléchargement complet')
        );
  }
  
  public uploadFile(id: string): void {
    this.counterSubscription = this.itemsService.uploadFile(id)
        .subscribe(
          () => {
            this.toastr.success('le fichier a été modifier avec succés');
            this.getItems();
          },
          () => this.toastr.error('erreur de modification'),
          () => this.toastr.success('upload complet')
        );
  }

  public deleteFile(id: string): void {
    this.counterSubscription = this.itemsService.deleteFile(id)
        .subscribe(
          () => {
            this.toastr.success('le fichier a été supprimer avec succés');
            this.getItems();
          },
          () => this.toastr.error('erreur de suppression'),
        );
  }

  sortData(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'creation': return compare(a.creation.toString(), b.creation.toString(), isAsc);
        case 'modification': return compare(a.modification.toString(), b.modification.toString(), isAsc);
        case 'folder': return compare(a.folder.toString(), b.folder.toString(), isAsc);
        default: return 0;
      }
    });
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
