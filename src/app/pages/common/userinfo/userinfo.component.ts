import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../services/auth/user';

@Component({
  selector: 'user-info',
  templateUrl: './userinfo.component.html',
  styleUrls: [ './userinfo.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {

  @Output() logoff = new EventEmitter<User>();
  @Input() login: string;

  constructor() {
  }

  logout(): void {
    this.logoff.emit({
      login: this.login
    });
  }
}
