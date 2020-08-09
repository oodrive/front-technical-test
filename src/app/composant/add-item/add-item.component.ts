import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsService } from '../../service/items.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'fl-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit, OnDestroy {

  private counterSubscription: Subscription;
  private itemForm: FormGroup;
  
  constructor(
    private itemsService: ItemsService,
    private formBuilder: FormBuilder,
    private router: Router,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      folder: ['', Validators.required],
    });
  }

  onSubmitForm() {
    const formValue = this.itemForm.value;
    this.counterSubscription = this.itemsService.createFile(formValue.name, formValue.folder)
        .subscribe(
          () => {
            this.toastr.success('le fichier a été ajouté avec succés');
            this.router.navigate(['items']);
          },
          () => this.toastr.error('erreur de téléchargement'),
          () => this.toastr.success('téléchargement complet')
        );
  }

  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
  }

}
