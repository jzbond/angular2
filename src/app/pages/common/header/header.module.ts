import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialsModule } from '../../../angular-materials.module';

import { HeaderComponent } from './header.component';
import { LogoComponent } from '../logo/logo.component';
import { UserInfoComponent } from '../userinfo/userinfo.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialsModule,
  ],
  declarations: [
    HeaderComponent,
    LogoComponent,
    UserInfoComponent,
    BreadcrumbComponent,
  ],
  exports: [ HeaderComponent ],
})
export class HeaderModule {
}
