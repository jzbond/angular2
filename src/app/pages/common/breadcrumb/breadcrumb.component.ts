import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: [ './breadcrumb.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {

  readonly currentPage: Observable<string | null>;

  constructor(private router: Router) {
    this.currentPage = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        if (event.url.length > 9 && event.url.startsWith('/courses/')) {
          const courseId = event.url.substring(9);
          if (courseId === 'new') {
            return 'New Course';
          } else {
            return `Course #${courseId}`;
          }
        }
        return null;
      })
    );
  }
}
