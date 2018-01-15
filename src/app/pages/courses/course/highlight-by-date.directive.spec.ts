import { HighlightByDateDirective } from './highlight-by-date.directive';
import { Component, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div [highlightByDate]="upcomingDate"></div>
    <div [highlightByDate]="freshDate"></div>
    <div [highlightByDate]="oldDate"></div>
    <div></div>
  `
})
class TestComponent {
  freshDate: Date;
  upcomingDate: Date;
  oldDate: Date;

  constructor() {
    this.upcomingDate = new Date(2017, 8, 15, 12, 0);
    this.freshDate = new Date(2017, 7, 1, 12, 0);
    this.oldDate = new Date(2017, 7, 1, 11, 59);
  }
}

describe('HighlightByDateDirective', () => {

  it('should create an instance', () => {
    const directive = new HighlightByDateDirective(new ElementRef(null));
    expect(directive).toBeTruthy();
  });

  describe('should be processed and', () => {

    let divs: DebugElement[];

    beforeEach(() => {
      jasmine.clock().install();
      jasmine.clock().mockDate(new Date(2017, 7, 15, 12, 0));

      const fixture: ComponentFixture<TestComponent> = TestBed.configureTestingModule({
        declarations: [ HighlightByDateDirective, TestComponent ]
      }).createComponent(TestComponent);

      fixture.detectChanges(); // initial binding

      divs = fixture.debugElement.queryAll(By.all());
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should set "blue" border color for 1st upcoming date (> curDate) element', () => {
      expect(divs[0].nativeElement.style.border).toBe('1px solid blue');
    });

    it('should set "green" border color for 2nd fresh date (>= curDate - 14d) element', () => {
      expect(divs[1].nativeElement.style.border).toBe('1px solid green');
    });

    it('should not set border color for 3rd old date (< curDate - 14d) element', () => {
      expect(divs[2].nativeElement.style.border).toBe('');
    });

    it('should not set border color for element without directive', () => {
      expect(divs[3].nativeElement.style.border).toBe('');
    });
  });
});
