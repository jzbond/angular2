import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../services/profile/user';

@Component({
  selector: 'user-info',
  templateUrl: './userinfo.component.html',
  styleUrls: [ './userinfo.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {

  @Output() logoff = new EventEmitter<User>();
  @Input() profile: User;

  constructor() {
  }

  logout(): void {
    this.logoff.emit(this.profile);
  }
}
