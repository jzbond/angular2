import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AngularMaterialsModule } from '../../angular-materials.module';

import { CoursesConfirmationDialogComponent } from './courses-confirmation-dialog.component';

describe('CoursesConfirmationDialogComponent', () => {
  let component: CoursesConfirmationDialogComponent;
  let fixture: ComponentFixture<CoursesConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ CoursesConfirmationDialogComponent ],
        imports: [ AngularMaterialsModule ],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatDialogRef, useValue: {} },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
