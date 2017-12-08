import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CoursesComponent} from './courses.component';
import {CourseComponent} from './course/course.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {MatCardModule} from "@angular/material";

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [CoursesComponent, CourseComponent, ToolbarComponent]
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
