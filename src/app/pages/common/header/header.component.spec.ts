import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularMaterialsModule } from '../../../angular-materials.module';

import { LogoComponent } from '../logo/logo.component';
import { HeaderComponent } from './header.component';
import { UserInfoComponent } from '../userinfo/userinfo.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ AngularMaterialsModule ],
        declarations: [ HeaderComponent, LogoComponent, UserInfoComponent, ]
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
