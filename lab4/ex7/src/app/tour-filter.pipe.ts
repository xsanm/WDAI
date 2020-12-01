import { Pipe, PipeTransform } from '@angular/core';
import { Tour } from './tour/tour.component';

@Pipe({
  name: 'tourFilter'
})
export class TourFilterPipe implements PipeTransform {

  transform(courses: Tour[]): Tour[] {
    return courses.filter(course => {
      return course.places < 5;
    })
  }

}
