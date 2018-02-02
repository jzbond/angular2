import { OrderByDatePipe } from './order-by-date.pipe';
import { Course } from '../../services/courses/course';

describe('OrderByDatePipe', () => {
  it('should order array by dates', () => {
    const courses: Course[] = [
      {
        id: 4,
        name: 'name 4',
        description: 'description 4',
        type: 'video',
        date: new Date(Date.UTC(2016, 0, 1)),
        durationInSeconds: 30 * 60,
        topRated: false,
      }, {
        id: 3,
        name: 'name 3',
        description: 'description 3',
        type: 'video',
        date: new Date(Date.UTC(2016, 3, 1)),
        durationInSeconds: 30 * 60,
        topRated: false,
      }, {
        id: 1,
        name: 'name 1',
        description: 'description 1',
        type: 'video',
        date: new Date(Date.UTC(2016, 5, 1)),
        durationInSeconds: 30 * 60,
        topRated: false,
      }, {
        id: 2,
        name: 'name 2',
        description: 'description 2',
        type: 'video',
        date: new Date(Date.UTC(2016, 3, 1)),
        durationInSeconds: 30 * 60,
        topRated: false,
      },
    ];
    const sortedCourses: Course[] = [
      {
        id: 1,
        name: 'name 1',
        description: 'description 1',
        type: 'video',
        date: new Date(Date.UTC(2016, 5, 1)),
        durationInSeconds: 30 * 60,
        topRated: false,
      }, {
        id: 3,
        name: 'name 3',
        description: 'description 3',
        type: 'video',
        date: new Date(Date.UTC(2016, 3, 1)),
        durationInSeconds: 30 * 60,
        topRated: false,
      }, {
        id: 2,
        name: 'name 2',
        description: 'description 2',
        type: 'video',
        date: new Date(Date.UTC(2016, 3, 1)),
        durationInSeconds: 30 * 60,
        topRated: false,
      }, {
        id: 4,
        name: 'name 4',
        description: 'description 4',
        type: 'video',
        date: new Date(Date.UTC(2016, 0, 1)),
        durationInSeconds: 30 * 60,
        topRated: false,
      }
    ];

    const pipe = new OrderByDatePipe();

    expect(pipe.transform(courses)).toEqual(sortedCourses);
  });
});
