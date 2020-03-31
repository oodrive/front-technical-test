import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Item } from '../../models/item';

@Component({
  selector: 'fl-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {

  /**
   * Form item for control form 
   * We can use form Ctrole wethout FormGroupe for 
   * this case becase it is not complecate and dont need to user formGroup
   */
  public formItem: FormGroup;

  public filteredItemOptions: Observable<Item[]>;

  public items: Item[];

  constructor(public dialogRef: MatDialogRef<ModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
    this.items = this.data && this.data.items ? this.data.items : [];
  }

  ngOnInit() {
    this.initForm();
    // if the opration of rename
    if (this.data && this.data.item) {
      this.formItem.controls.folder.clearValidators();
      this.formItem.controls.parentId.clearValidators();
      this.formItem.controls.name.setValue(this.data.item.name);
    } else { // else create
      if (!this.data.currentItem || ((!this.items || this.items.length === 0) && this.data.currentItem)) {
        this.formItem.controls.parentId.clearValidators();
        this.formItem.controls.parentId.disable();
        this.formItem.controls.parentId.setValue(this.data.currentItem);
      } else {
        this.items.push(this.data.currentItem);
      }
      this.initItemAutoComplete();
    }
  }

  /**
   * Init the form and apply the validator to fields
   */
  initForm() {
    this.formItem = this.formBuilder.group({
      name: ['', Validators.required],
      folder: [true, Validators.required],
      parentId: ['', Validators.required],
    });
  }

  /**
   * Close dialog and submit the form data
   * value to the prarent Component
   */
  public onSubmit() {
    this.dialogRef.close(this.formItem.value);
  }

  /**
   * Init the autocomplete field with the list of items
   */
  initItemAutoComplete() {
    this.filteredItemOptions = this.formItem.controls.parentId.valueChanges
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

  displatWithName(id: any) {
    if (!id) { return ''; }
    if (id instanceof Object && id.name) {
      return id.name;
    } else {
      const index = this.items.findIndex((state) => state.id === id);
      return this.items[index].name;
    }
  }
}
