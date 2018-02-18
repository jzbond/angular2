import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialsModule } from '../../../angular-materials.module';

import { LogoComponent } from '../logo/logo.component';
import { HeaderComponent } from './header.component';
import { UserInfoComponent } from '../userinfo/userinfo.component';
import { AuthorizationService } from '../../../services/auth/authorization.service';
import { AuthorizationServiceStub } from '../../../services/auth/authorization.service.stub';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ AngularMaterialsModule, RouterTestingModule ],
        declarations: [ HeaderComponent, LogoComponent, UserInfoComponent, ],
        providers: [ { provide: AuthorizationService, useClass: AuthorizationServiceStub } ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
