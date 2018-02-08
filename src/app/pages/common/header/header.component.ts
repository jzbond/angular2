import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorizationService } from '../../../services/auth/authorization.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../services/auth/user';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private logoutSubscription: Subscription;

  profile: Observable<User>;

  constructor(private authService: AuthorizationService) {
  }

  ngOnInit() {
    this.profile = this.authService.profile;
    this.logoutSubscription = this.authService.userLogout.subscribe();
  }

  ngOnDestroy() {
    this.logoutSubscription.unsubscribe();
  }

  logout(login: string): void {
    this.authService.logout(login);
  }
}
