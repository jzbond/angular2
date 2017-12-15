import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';

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
    CoursesConfirmationDialog,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
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
