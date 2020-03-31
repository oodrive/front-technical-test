import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'fl-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {

  public files: any[] = [];

  @Output()
  public filesOutput: EventEmitter<any[]> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Emit the files o the parent component
   * @param files : files to upload
   */
  filesDropped(files: any[]): void {
    this.files = files;
    this.filesOutput.emit(this.files);

  }

}
