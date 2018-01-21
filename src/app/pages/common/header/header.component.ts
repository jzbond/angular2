import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../../services/auth/authorization.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  login: Observable<string>;

  constructor(private authService: AuthorizationService) {
  }

  ngOnInit() {
    this.login = this.authService.user;
  }

  logout(login: string): void {
    this.authService.logout().subscribe();
  }

}
