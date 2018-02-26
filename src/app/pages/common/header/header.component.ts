import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthorizationService } from '../../../services/auth/authorization.service';
import { LogoutUser, RestoreUser } from '../../../services/auth/authorization.action';
import { User } from '../../../services/profile/user';
import { AppState, selectUserProfile } from '../../../app.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private logoutSubscription: Subscription;

  profile: Observable<User>;

  constructor(private authService: AuthorizationService, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.profile = this.store.pipe(select(selectUserProfile));
    this.store.dispatch(new RestoreUser());
  }

  ngOnDestroy() {
    this.logoutSubscription.unsubscribe();
  }

  logout(login: string): void {
    this.store.dispatch(new LogoutUser(login));
  }
}
