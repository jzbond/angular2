import {Component} from '@angular/core';
import {AuthorizationService} from "./services/auth/authorization.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private authService: AuthorizationService;

  constructor() {
    this.authService = new AuthorizationService();
  }

  isAuthorized():boolean {
    return this.authService.isAuthenticated();
  }
}
