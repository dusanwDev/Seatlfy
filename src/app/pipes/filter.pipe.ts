import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: string, userInput: string, prpname: string): unknown {
    const filtered = [];
    let reg = new RegExp(`^${userInput}`, 'gi');
    //da ne bi odmah napravio dropdown nego tek kada kucamp
    if (userInput.length === 0) {
      return;
    }
    for (const item of value) {
      if (
        (item[prpname] && item[prpname].match(reg)) ||
        (item[prpname] && item[prpname].match(reg))
      ) {
        filtered.push(item);
      }
    }

    return filtered;
  }
}
