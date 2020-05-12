import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { File } from 'src/app/core/models/file.model';
import { FileService } from 'src/app/core/services/file/file.service';

@Injectable()
export class FileExplorerEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private fileService: FileService
  ) {}

  loadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[File Explorer] Get Files'),
      mergeMap((folder: File) =>
        this.fileService
          .getItems(folder.id)
          .pipe(
            map((files: File[]) => ({ type: '[File Explorer] Get Files Success', payload: files }))
          )
      )
    )
  );

  openFodler$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType('[File Explorer] Open Folder'),
        switchMap((folder: File) => this.router.navigate(['my-folder', folder.id]))
      ),
    { dispatch: false }
  );

  //   loadMovies$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType('[Movies Page] Load Movies'),
  //       mergeMap(() =>
  //         this.moviesService.getAll().pipe(
  //           map((movies) => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
  //           catchError(() => EMPTY)
  //         )
  //       )
  //     )
  //   );
}
