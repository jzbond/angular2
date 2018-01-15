import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';


/**
 * Directives puts green border for fresh course ((courseCreatedDate < currentDate) && (courseCreatedDate >=
 * (currentDate - 14days))). For upcoming courses (courseCreatedDate > currentDate) blue border is used.
 * Otherwise - no changes are made.
 */
@Directive({
  selector: '[highlightByDate]'
})
export class HighlightByDateDirective implements OnInit {
  private currentDate: Moment;
  @Input('highlightByDate') courseCreatedDate: Date;

  constructor(private courseCard: ElementRef) {
    this.currentDate = moment();
  }

  ngOnInit(): void {
    const courseDate: Moment = moment(this.courseCreatedDate);
    if (courseDate.isAfter(this.currentDate)) {
      this.courseCard.nativeElement.style.border = '1px solid blue';
    } else if (courseDate.isSameOrAfter(this.currentDate.subtract(14, 'days'))) {
      this.courseCard.nativeElement.style.border = '1px solid green';
    }
  }
}
