import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthorizationService } from '../../services/auth/authorization.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { LoginUser } from '../../services/auth/authorization.action';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  constructor(private authService: AuthorizationService, private store: Store<AppState>) {
  }

  loginUser(login: string, password: string): void {
    this.store.dispatch(new LoginUser({ login, password }));
  }

}
