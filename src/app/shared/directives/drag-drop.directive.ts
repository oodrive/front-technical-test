import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Directive({
  selector: '[flDragDrop]'
})
export class DragDropDirective {

  @Output() files: EventEmitter<any[]> = new EventEmitter();

  @HostBinding('style')
  public borderStyle: SafeStyle;

  constructor(private sanitizer: DomSanitizer) {
    this.borderStyle = this.sanitizer.bypassSecurityTrustStyle('border: none;');
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.borderStyle = this.sanitizer.bypassSecurityTrustStyle('border: 2px dashed #92a8d1;border-radius: 2em;');
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.borderStyle = this.sanitizer.bypassSecurityTrustStyle('border: none;');
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.borderStyle = this.sanitizer.bypassSecurityTrustStyle('border: none;');

    const files: any[] = [];
    if (evt && evt.dataTransfer) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < evt.dataTransfer.files.length; i++) {
        const file = evt.dataTransfer.files[i];
        files.push(file);
      }
    }
    if (files.length > 0) {
      this.files.emit(files);
    }
  }
}
