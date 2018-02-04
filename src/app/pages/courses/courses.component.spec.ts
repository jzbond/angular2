import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialsModule } from '../../angular-materials.module';

import { CoursesComponent } from './courses.component';
import { CoursesService } from '../../services/courses/courses.service';
import { CoursesModule } from './courses.module';
import { HttpClientModule } from '@angular/common/http';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          AngularMaterialsModule,
          NoopAnimationsModule,
          CoursesModule,
          HttpClientModule,
        ],
        providers: [
          CoursesService,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
