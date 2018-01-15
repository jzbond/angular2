import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialsModule } from '../../angular-materials.module';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HighlightByDateDirective } from './course/highlight-by-date.directive';
import { DurationPipe } from './course/duration.pipe';
import { OrderByDatePipe } from './order-by-date.pipe';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ AngularMaterialsModule, NoopAnimationsModule, ],
        declarations: [
          CoursesComponent,
          CourseComponent,
          ToolbarComponent,
          HighlightByDateDirective,
          DurationPipe,
          OrderByDatePipe,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
