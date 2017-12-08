import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CoursesComponent} from './pages/courses/courses.component';
import {AboutComponent} from './pages/about/about.component';
import {ToolbarComponent} from './pages/courses/toolbar/toolbar.component';

const routes: Routes = [
  {path: 'courses', component: CoursesComponent},
  {path: 'about', component: AboutComponent},
  {path: '', redirectTo: '/courses', pathMatch: 'full'},
  {path: '**', component: ToolbarComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
