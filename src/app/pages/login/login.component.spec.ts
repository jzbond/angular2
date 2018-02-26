import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { AngularMaterialsModule } from '../../angular-materials.module';

import { LoginComponent } from './login.component';
import { AuthorizationService } from '../../services/auth/authorization.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authorizationServiceMock: AuthorizationService;

  beforeEach(async(() => {
    authorizationServiceMock = jasmine.createSpyObj(
      'AuthorizationService',
      [ 'login', 'logout', 'restoreAuthorizedUser' ]);

    TestBed.configureTestingModule({
        declarations: [ LoginComponent ],
        imports: [ AngularMaterialsModule, NoopAnimationsModule, FormsModule, RouterTestingModule, StoreModule.forRoot([]) ],
        providers: [ { provide: AuthorizationService, useValue: authorizationServiceMock } ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
