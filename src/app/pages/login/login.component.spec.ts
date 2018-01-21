import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialsModule } from '../../angular-materials.module';

import { LoginComponent } from './login.component';
import { AuthorizationService } from '../../services/auth/authorization.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ LoginComponent ],
        imports: [ AngularMaterialsModule, NoopAnimationsModule ],
        providers: [ AuthorizationService, ],
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
