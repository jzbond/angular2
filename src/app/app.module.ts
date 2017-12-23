import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {MatButtonModule, MatToolbarModule, MatCardModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './pages/common/header/header.component';
import {FooterComponent} from './pages/common/footer/footer.component';
import {LogoComponent} from './pages/common/logo/logo.component';
import {LoginComponent} from './pages/login/login.component';
import {CoursesComponent, CoursesConfirmationDialog} from './pages/courses/courses.component';
import {CourseComponent} from './pages/courses/course/course.component';
import {ToolbarComponent} from './pages/courses/toolbar/toolbar.component';
import {AboutComponent} from './pages/about/about.component';
import {UserInfoComponent} from "./pages/common/userinfo/userinfo.component";
import { HighlightByDateDirective } from './pages/courses/course/highlight-by-date.directive';
import { DurationPipe } from './pages/courses/course/duration.pipe';
import { OrderByCreatedDatePipe } from './pages/courses/order-by-created-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    LoginComponent,
    CoursesComponent,
    CourseComponent,
    ToolbarComponent,
    AboutComponent,
    UserInfoComponent,
    CoursesConfirmationDialog,
    HighlightByDateDirective,
    DurationPipe,
    OrderByCreatedDatePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    AppRoutingModule,
    FormsModule,
  ],
  entryComponents: [
    CoursesConfirmationDialog,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
