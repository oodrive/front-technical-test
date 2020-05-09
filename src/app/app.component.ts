import { Component, OnInit } from '@angular/core';
import { FileService } from './core/services/file/file.service';
import { File } from './core/models/file.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'front-technical-test';
  items: File[] = [];

  constructor(private fileService: FileService) {}

  ngOnInit() {
    this.fileService.getItems().subscribe((items) => {
      this.items = items;
    });
  }
}
