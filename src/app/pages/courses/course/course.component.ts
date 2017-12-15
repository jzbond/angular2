import {
  Component, OnInit, OnChanges, OnDestroy, DoCheck, Input, EventEmitter, Output,
  SimpleChanges, AfterViewChecked, AfterViewInit, AfterContentInit, AfterContentChecked,
} from '@angular/core';
import {Course} from "../../../services/courses/course";

@Component({
  selector: 'course-card',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy, OnChanges, DoCheck, AfterViewChecked, AfterViewInit, AfterContentInit, AfterContentChecked {
  private nextId: number = 0;

  @Output('delete') deleteCourseEmitter = new EventEmitter();
  @Input('course') course: Course = {
    id: 0,
    description: '',
    durationInSeconds: 0,
    name: '',
    type: '',
    date: null
  };

  constructor() {
  }

  deleteCourse() {
    this.deleteCourseEmitter.emit({
      id: this.course.id,
      name: this.course.name
    });
  }

  ngOnInit(): void {
    this.logIt('OnInit');
  }

  ngOnDestroy(): void {
    this.logIt('OnDestroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.logIt(`OnChanges - ${changes}`);
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
    // TODO inject logger service
    console.log(`Course ${this.course.id}: #${this.nextId++} ${msg}`);
  }
}
