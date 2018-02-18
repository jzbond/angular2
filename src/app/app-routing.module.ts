import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses/courses.component';
import { AboutComponent } from './pages/about/about.component';
import { ErrorComponent } from './pages/error/error.component';
import { EditorComponent } from './pages/courses/edit/editor.component';
import { AuthorizedGuard } from './services/auth/authorized.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'courses', component: CoursesComponent, canActivate: [ AuthorizedGuard ] },
  { path: 'courses/new', component: EditorComponent, canActivate: [ AuthorizedGuard ] },
  { path: 'courses/:id', component: EditorComponent, canActivate: [ AuthorizedGuard ] },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
