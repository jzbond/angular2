import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Course } from '../../../services/courses/course';

@Component({
  selector: 'course-card',
  templateUrl: './course.component.html',
  styleUrls: [ './course.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit, OnDestroy, OnChanges, DoCheck, AfterViewChecked, AfterViewInit, AfterContentInit,
  AfterContentChecked {
  private nextId = 0;

  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Input() course: Course;

  constructor() {
  }

  deleteCourse() {
    this.delete.emit({
      id: this.course.id,
      name: this.course.name
    });
  }

  editCourse() {
    this.edit.emit({
      id: this.course.id,
    });
  }

  ngOnInit(): void {
    this.logIt('OnInit');
  }

  ngOnDestroy(): void {
    this.logIt('OnDestroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.logIt(`OnChanges - ${JSON.stringify(changes)}`);
  }

  ngDoCheck(): void {
    this.logIt('DoCheck');
  }

  ngAfterViewChecked(): void {
    this.logIt('AfterViewChecked');
  }

  ngAfterViewInit(): void {
    this.logIt('AfterViewInit');
  }

  ngAfterContentInit(): void {
    this.logIt('AfterContentInit');
  }

  ngAfterContentChecked(): void {
    this.logIt('AfterContentChecked');
  }

  private logIt(msg: string) {
    console.log(`Course ${this.course.id}: #${this.nextId++} ${msg}`);
  }
}
