import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialsModule } from '../../../angular-materials.module';

import { EditComponent } from './edit.component';
import { DurationPipe } from '../course/duration.pipe';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ EditComponent, DurationPipe, ],
        imports: [ AngularMaterialsModule, NoopAnimationsModule, ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
