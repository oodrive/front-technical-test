import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IFile } from 'src/app/core/models/file.model';
import { FileService } from 'src/app/core/services/file/file.service';
import { actionTypes } from './folder-explorer.actions';

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
          .pipe(map((files: IFile[]) => ({ type: actionTypes.getFilesSuccess, payload: files })))
      )
    )
  );

  openFodler$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionTypes.openFolder),
        switchMap((folder: IFile) => this.router.navigate(['my-folder', folder.id]))
      ),
    { dispatch: false }
  );

  renameFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionTypes.renameFile),
      mergeMap((folder: IFile) =>
        this.fileService
          .renameFile(folder)
          .pipe(map((file) => ({ type: actionTypes.renameFileSuccess, file })))
      )
    )
  );

  addFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionTypes.addFolder),
      mergeMap((payload: { parentFolder: IFile; name: string }) =>
        this.fileService.createFolder(payload.name, payload.parentFolder.id).pipe(
          map(() => ({
            type: actionTypes.addFolderSuccess,
            file: {
              id: null,
              name: payload.name,
              parentId: payload.parentFolder.id,
              folder: true,
            },
          }))
        )
      )
    )
  );

  copyPasteFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionTypes.pasteFile),
      mergeMap((file: IFile) =>
        this.fileService
          .moveFile(file)
          .pipe(map(() => ({ type: actionTypes.pasteFileSuccess, file })))
      )
    )
  );

  removeFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionTypes.removeFile),
      mergeMap((file: IFile) =>
        this.fileService
          .removeFile(file)
          .pipe(map(() => ({ type: actionTypes.removeFileSuccess, file })))
      )
    )
  );
}
