import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularMaterialsModule } from '../../../angular-materials.module';

import { CourseComponent } from './course.component';
import { HighlightByDateDirective } from './highlight-by-date.directive';
import { DurationPipe } from './duration.pipe';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ CourseComponent, HighlightByDateDirective, DurationPipe ],
        imports: [ AngularMaterialsModule ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    component.course = {
      id: 0,
      name: '',
      description: '',
      type: '',
      date: null,
      durationInSeconds: 0,
      topRated: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
