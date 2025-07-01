import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twoDigitFormat',
  standalone: true
})
export class TwoDigitFormatPipe implements PipeTransform {

  transform(value: number | string): string {
    const stringValue = String(value);
    // This handles simple integer cases like 5 -> "05"
    // For more complex scenarios like decimals, logic could be expanded.
    if (stringValue.includes('.')) {
      const parts = stringValue.split('.');
      parts[0] = parts[0].padStart(2, '0');
      return parts.join('.');
    }
    return stringValue.padStart(2, '0');
  }

}
