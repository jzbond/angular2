import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialsModule } from '../../angular-materials.module';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CoursesConfirmationDialogComponent } from './courses-confirmation-dialog.component';
import { HighlightByDateDirective } from './course/highlight-by-date.directive';
import { DurationPipe } from './course/duration.pipe';
import { OrderByCreatedDatePipe } from './order-by-created-date.pipe';


@NgModule({
  imports: [
    CommonModule,
    AngularMaterialsModule,
  ],
  declarations: [
    CoursesComponent,
    CourseComponent,
    ToolbarComponent,
    CoursesConfirmationDialogComponent,
    HighlightByDateDirective,
    DurationPipe,
    OrderByCreatedDatePipe,
  ],
  entryComponents: [
    CoursesConfirmationDialogComponent,
  ],
  exports: [
    CoursesComponent,
  ]
})
export class CoursesModule {
}
