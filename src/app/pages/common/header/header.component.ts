import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthorizationService } from '../../../services/auth/authorization.service';
import { User } from '../../../services/auth/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private logoutSubscription: Subscription;

  profile: Observable<User>;

  constructor(private authService: AuthorizationService, private router: Router) {
  }

  ngOnInit() {
    this.profile = this.authService.profile;
    this.logoutSubscription = this.authService.userLogout.subscribe(() => {
      this.router.navigate([ '/login' ]);
    });
    this.authService.init();
  }

  ngOnDestroy() {
    this.logoutSubscription.unsubscribe();
  }

  logout(login: string): void {
    this.authService.logout(login);
  }
}
