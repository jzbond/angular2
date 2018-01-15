import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularMaterialsModule } from './angular-materials.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/common/header/header.component';
import { FooterComponent } from './pages/common/footer/footer.component';
import { LogoComponent } from './pages/common/logo/logo.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { UserInfoComponent } from './pages/common/userinfo/userinfo.component';
import { CoursesModule } from './pages/courses/courses.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    LoginComponent,
    AboutComponent,
    UserInfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialsModule,
    FormsModule,
    CoursesModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
