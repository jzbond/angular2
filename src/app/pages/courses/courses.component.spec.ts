import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CoursesComponent} from './courses.component';
import {CourseComponent} from './course/course.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {MatCardModule} from "@angular/material";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {HighlightByDateDirective} from "./course/highlight-by-date.directive";

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatDialogModule, FormsModule],
      declarations: [CoursesComponent, CourseComponent, ToolbarComponent, HighlightByDateDirective]
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
