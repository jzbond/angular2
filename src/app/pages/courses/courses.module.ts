import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialsModule } from '../../angular-materials.module';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CoursesConfirmationDialogComponent } from './courses-confirmation-dialog.component';
import { HighlightByDateDirective } from './course/highlight-by-date.directive';
import { DurationPipe } from './course/duration.pipe';
import { OrderByDatePipe } from './order-by-date.pipe';
import { CoursesService } from '../../services/courses/courses.service';
import { EditComponent } from './edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from './edit/editor.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialsModule,
  ],
  declarations: [
    CoursesComponent,
    CourseComponent,
    ToolbarComponent,
    CoursesConfirmationDialogComponent,
    HighlightByDateDirective,
    DurationPipe,
    OrderByDatePipe,
    EditComponent,
    EditorComponent,
  ],
  entryComponents: [
    CoursesConfirmationDialogComponent,
  ],
  providers: [
    CoursesService,
  ],
  exports: [
    CoursesComponent,
  ]
})
export class CoursesModule {
}
