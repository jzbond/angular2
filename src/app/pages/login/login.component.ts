import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../../services/auth/authorization.service";

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private authService: AuthorizationService;

  constructor() {
    this.authService = new AuthorizationService();
  }

  ngOnInit() {
  }

  loginUser(userLogin: string, userPassword: string): void {
    this.authService.login(userLogin, userPassword);
  }

}
