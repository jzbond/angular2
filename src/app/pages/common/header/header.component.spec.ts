import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderModule } from './header.module';
import { HeaderComponent } from './header.component';
import { AuthorizationService } from '../../../services/auth/authorization.service';
import { AuthorizationServiceStub } from '../../../services/auth/authorization.service.stub';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ HeaderModule, RouterTestingModule ],
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
