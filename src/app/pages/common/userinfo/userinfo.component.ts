import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'user-info',
  templateUrl: './userinfo.component.html',
  styleUrls: [ './userinfo.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {

  @Output() logoff = new EventEmitter();
  @Input() login: string;

  constructor() {
  }

  logout(): void {
    this.logoff.emit({
      login: this.login
    });
  }
}
