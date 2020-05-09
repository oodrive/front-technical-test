import { Pipe, PipeTransform } from '@angular/core';
import { File } from 'src/app/core/models/file.model';

@Pipe({
  name: 'fileFilter',
})
export class FileFilterPipe implements PipeTransform {
  transform(fileList: File[], input: string): File[] {
    if (fileList && input) {
      return fileList.filter((file) => file.name.includes(input));
    }
    return fileList;
  }
}
