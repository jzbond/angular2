import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthorizationService } from '../../services/auth/authorization.service';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {

  private loginSubscription: Subscription;

  constructor(private authService: AuthorizationService, private router: Router) {
  }

  ngOnInit() {
    this.loginSubscription = this.authService.profile.subscribe(() => {
      this.router.navigate([ '/' ]);
    });
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  loginUser(userLogin: string, userPassword: string): void {
    this.authService.login(userLogin, userPassword);
  }

}
