import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'test',
})
export class TestPipe implements PipeTransform {
  transform(value: string, genre: string, genreValue: string): unknown {
    let returnArray = [];

    for (const item of value) {
      if (item[genre] === genreValue) {
        returnArray.push(item);
      }
    }
    return returnArray;
  }
}
