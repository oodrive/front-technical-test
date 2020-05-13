import { Pipe, PipeTransform } from '@angular/core';
import { IFile } from 'src/app/core/models/file.model';

@Pipe({
  name: 'fileFilter',
})
export class FileFilterPipe implements PipeTransform {
  transform(fileList: IFile[], input: string): IFile[] {
    if (fileList && input) {
      return fileList.filter((file) => file.name.includes(input));
    }
    return fileList;
  }
}
