import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../../services/auth/authorization.service';

@Component({
  selector: 'user-info',
  templateUrl: './userinfo.component.html',
  styleUrls: [ './userinfo.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements OnInit {

  private authService: AuthorizationService;

  constructor() {
    this.authService = new AuthorizationService();
  }

  ngOnInit() {
  }

  isAuthorized(): boolean {
    return this.authService.isAuthenticated();
  }

  getAuthUser(): string {
    return this.authService.getUserInfo();
  }

  logout(): void {
    this.authService.logout();
  }
}
