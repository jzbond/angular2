import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../../services/courses/course';

@Component({
  selector: 'course-edit',
  templateUrl: './edit.component.html',
  styleUrls: [ './edit.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent implements OnChanges {

  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter<Course>();
  @Input() course: Course;

  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      title: new FormControl('', [ Validators.required, Validators.maxLength(50) ]),
      description: new FormControl('', [ Validators.required, Validators.maxLength(500) ]),
      date: new FormControl('', [ Validators.required ]),
      duration: new FormControl(0, [ Validators.required, ]),
      authors: new FormControl('', [ Validators.required ]),
    });
  }

  ngOnChanges() {
    if (!this.course) {
      this.editForm.setValue({
        title: '',
        description: '',
        date: '',
        duration: '',
        authors: '',
      });
    } else {
      this.editForm.setValue({
        title: this.course.name,
        description: this.course.description,
        date: this.course.date,
        duration: this.course.durationInSeconds,
        authors: '',
      });
    }
  }

  saveCourse() {
    this.save.emit(this.course);
  }

  discard() {
    this.cancel.emit();
  }

  get title(): AbstractControl {
    return this.editForm.get('title')!;
  }

  get description(): AbstractControl {
    return this.editForm.get('description')!;
  }

  get date(): AbstractControl {
    return this.editForm.get('date')!;
  }

  get durationInMin(): AbstractControl {
    return this.editForm.get('duration')!;
  }

  get authors(): AbstractControl {
    return this.editForm.get('authors')!;
  }

  getErrorMessage(control: AbstractControl) {
    return control.hasError('required') ? 'You must enter a value' :
      control.hasError('maxlength') ? `Value can not exceed ${control.getError('maxlength').requiredLength} symbols` :
        JSON.stringify(control.errors);
  }
}
