import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatCardModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import {MatDialogModule} from "@angular/material/dialog";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

import {CoursesComponent} from './courses.component';
import {CourseComponent} from './course/course.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {HighlightByDateDirective} from "./course/highlight-by-date.directive";
import {DurationPipe} from "./course/duration.pipe";
import {OrderByCreatedDatePipe} from "./order-by-created-date.pipe";

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule, NoopAnimationsModule,],
      declarations: [
        CoursesComponent,
        CourseComponent,
        ToolbarComponent,
        HighlightByDateDirective,
        DurationPipe,
        OrderByCreatedDatePipe,
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
