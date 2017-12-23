import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(durationInSec: number): string {
    const duration = moment.duration(durationInSec, 'seconds');
    let formatted = `${duration.minutes()}min`;
    if (duration.hours() > 0) {
      formatted = `${duration.hours()}h ${formatted}`;
    }
    return formatted;
  }

}
