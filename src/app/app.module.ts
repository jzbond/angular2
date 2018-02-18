import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularMaterialsModule } from './angular-materials.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './pages/common/header/header.component';
import { FooterComponent } from './pages/common/footer/footer.component';
import { LogoComponent } from './pages/common/logo/logo.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { UserInfoComponent } from './pages/common/userinfo/userinfo.component';
import { CoursesModule } from './pages/courses/courses.module';
import { AuthorizationService } from './services/auth/authorization.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthorizationInterceptor } from './services/auth/authorization.interceptor';
import { AuthorizedGuard } from './services/auth/authorized.guard';
import { ErrorComponent } from './pages/error/error.component';
import { NotificationService } from './services/notification/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    LoginComponent,
    AboutComponent,
    UserInfoComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialsModule,
    CoursesModule,
    AppRoutingModule,
  ],
  providers: [
    AuthorizationService,
    AuthorizedGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
    NotificationService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
