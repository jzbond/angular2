import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../services/courses/course';

@Pipe({
  name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {

  transform(courses: Course[]) {
    return courses.sort((c1: Course, c2: Course) => {
      return c2.date.getTime() - c1.date.getTime();
    });
  }

}
