import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "yesNo"
})
export class YesNoPipe implements PipeTransform {
  transform(value: any): any {
    return value ? "Oui" : "Non";
  }
}