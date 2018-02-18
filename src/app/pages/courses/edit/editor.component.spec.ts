import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularMaterialsModule } from '../../../angular-materials.module';

import { EditorComponent } from './editor.component';
import { EditComponent } from './edit.component';
import { DurationPipe } from '../course/duration.pipe';
import { CoursesService } from '../../../services/courses/courses.service';
import { NotificationService } from '../../../services/notification/notification.service';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ EditComponent, DurationPipe, EditorComponent],
        imports: [ AngularMaterialsModule, NoopAnimationsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule ],
        providers: [ CoursesService, NotificationService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
