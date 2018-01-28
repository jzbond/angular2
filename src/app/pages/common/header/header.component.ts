import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../../services/auth/authorization.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../services/auth/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  login: Observable<User>;

  constructor(private authService: AuthorizationService) {
  }

  ngOnInit() {
    this.login = this.authService.userLogin;
  }

  logout(login: string): void {
    this.authService.logout(login);
  }
}
