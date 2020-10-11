import { Directive, Output, EventEmitter, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[flDragNDrop]'
})
export class DragNDropDirective {

  @Output() onFileDropped = new EventEmitter<any>();
  @HostBinding('style.border') border = '#f5fcff'
  
  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.border = 'dashed 3px #78a3ff';
  }

  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.border = 'none';
  }

  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.border = 'none';
    let files = evt.dataTransfer.files;
    if (files.length > 0) this.onFileDropped.emit(files)
  }

}
