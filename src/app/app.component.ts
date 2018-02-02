import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthorizationService } from './services/auth/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthorizationService) {
  }

  ngOnInit(): void {
    this.authService.init();
  }

  isAuthorized(): boolean {
    return this.authService.isAuthenticated();
  }
}
