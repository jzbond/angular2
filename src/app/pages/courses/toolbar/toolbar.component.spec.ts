import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatFormFieldModule, MatInputModule} from "@angular/material";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

import {ToolbarComponent} from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [MatFormFieldModule, MatInputModule, NoopAnimationsModule,],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
