import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jtPhone'
})
export class JtPhonePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return;
    
    if (value.length === 10) {
      return value.substr(0,3) + '-' + value.substr(3,3) + '-' + value.substr(6);
    } else if (value.length === 7) {
      return value.substr(0,3) + '-' + value.substr(3);
    }
    return value;
  }

}
