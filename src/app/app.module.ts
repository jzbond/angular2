import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './pages/common/header/header.component';
import {FooterComponent} from './pages/common/footer/footer.component';
import {LogoComponent} from './pages/common/logo/logo.component';
import {LoginComponent} from './pages/login/login.component';
import {CoursesComponent} from './pages/courses/courses.component';
import {CourseComponent} from './pages/courses/course/course.component';
import {ToolbarComponent} from './pages/courses/toolbar/toolbar.component';
import { AboutComponent } from './pages/about/about.component';

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
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
