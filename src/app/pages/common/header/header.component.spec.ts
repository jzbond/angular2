import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { HeaderModule } from './header.module';
import { HeaderComponent } from './header.component';
import { AuthorizationService } from '../../../services/auth/authorization.service';
import { profileReducer } from '../../../services/profile/profile.reducer';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authorizationServiceMock: AuthorizationService;

  beforeEach(async(() => {
    authorizationServiceMock = jasmine.createSpyObj(
      'AuthorizationService',
      [ 'login', 'logout', 'restoreAuthorizedUser' ]);

    TestBed.configureTestingModule({
        imports: [ HeaderModule, RouterTestingModule, StoreModule.forRoot({ 'profile': profileReducer }) ],
        providers: [ { provide: AuthorizationService, useValue: authorizationServiceMock } ],
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
