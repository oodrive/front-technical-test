import { Component, OnInit } from '@angular/core';
import { FileService } from '../../../services/_services/file.service.ts.service';

@Component({
  selector: 'fl-list-file',
  templateUrl: './list-file.component.html',
  styleUrls: ['./list-file.component.css']
})
export class ListFileComponent implements OnInit {

  constructor(public fileService: FileService) { }

  ngOnInit() {
    this.fileService.getListItems().subscribe(res => {
      console.log(res)
    });

    this.fileService.DownloadFile("8oCI4uHjzQ").subscribe(res => {
      console.log('DownloadFile')
      console.log(res)
      console.log('DownloadFile')

    });
    this.fileService.getListItemsById("8oCI4uHjzQ").subscribe(res => {
      console.log('getListItemsById')
      console.log(res)
      console.log('getListItemsById')

    });
    this.fileService.additems({
      "name": "chichi",
      "folder": true
    }).subscribe(res => {
      console.log('additems')
      console.log(res)
      console.log('additems')

    });
    this.fileService.Patchitems( "8oCI4uHjzQ" ,{
      "parentId": "ccc"
    }).subscribe(res => {
      console.log('Patchitems')
      console.log(res)
      console.log('Patchitems')

    });
    // this.fileService.deleteAbscence("IvTMXurVib").subscribe(res => {
    //   console.log('deleteAbscence')
    //   console.log(res)
    //   console.log('deleteAbscence')

    // });
  }
}



