import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IFile } from 'src/app/core/models/file.model';
import { FileService } from 'src/app/core/services/file/file.service';
import {
  actionTypes,
  pasteFileSuccess,
  removeFileSuccess,
  getFilesSuccess,
  renameFileSuccess,
  addFolderSuccess,
  importFilesSuccess,
} from './folder-explorer.actions';
import { Observable, concat } from 'rxjs';

@Injectable()
export class FileExplorerEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private fileService: FileService
  ) {}

  loadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionTypes.getFiles),
      mergeMap((folder: IFile) =>
        this.fileService
          .getItems(folder.id)
          .pipe(map((files: IFile[]) => getFilesSuccess({ files })))
      )
    )
  );

  openFodler$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionTypes.openFolder),
        switchMap((folder: IFile) =>
          folder.id
            ? this.router.navigate(['my-folder', folder.id])
            : this.router.navigate(['my-folder'])
        )
      ),
    { dispatch: false }
  );

  renameFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionTypes.renameFile),
      mergeMap((folder: IFile) =>
        this.fileService.renameFile(folder).pipe(map((file) => renameFileSuccess({ file })))
      )
    )
  );

  addFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionTypes.addFolder),
      map((payload: { parentFolder: IFile; name: string }) => ({
        parentFolder: payload.parentFolder,
        names: payload.name.split('/'),
      })),
      map((payload: { parentFolder: IFile; names: string[] }) =>
        // parentId should be previous folder id otherwise should be parentFolder id
        payload.names.map((file) => this.fileService.createFolder(file, payload.parentFolder.id))
      ),
      mergeMap((obs$: Observable<IFile>[]) => concat(...obs$)),
      map(() => addFolderSuccess())
    )
  );

  importFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionTypes.importFiles),
      map((payload: { parentFolder: IFile; names: string[] }) =>
        payload.names.map((file) => this.fileService.importFile(file, payload.parentFolder.id))
      ),
      mergeMap((obs$: Observable<IFile>[]) => concat(...obs$)),
      map(() => importFilesSuccess())
    )
  );

  copyPasteFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionTypes.pasteFile),
      mergeMap((file: IFile) =>
        this.fileService.moveFile(file).pipe(map(() => pasteFileSuccess({ file })))
      )
    )
  );

  removeFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionTypes.removeFile),
      mergeMap((file: IFile) =>
        this.fileService.removeFile(file).pipe(map(() => removeFileSuccess({ file })))
      )
    )
  );
}
