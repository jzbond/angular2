import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AngularMaterialsModule } from './angular-materials.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './pages/common/header/header.module';
import { CoursesModule } from './pages/courses/courses.module';
import { FooterComponent } from './pages/common/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { ErrorComponent } from './pages/error/error.component';
import { AuthorizationService } from './services/auth/authorization.service';
import { AuthorizationInterceptor } from './services/auth/authorization.interceptor';
import { AuthorizedGuard } from './services/auth/authorized.guard';
import { NotificationService } from './services/notification/notification.service';
import { AppStoreModule } from './app-store.module';
import { ProfileService } from './services/profile/profile.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    AboutComponent,
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
    HeaderModule,
    AppStoreModule,
  ],
  providers: [
    AuthorizationService,
    AuthorizedGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
    ProfileService,
    NotificationService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
