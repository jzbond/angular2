import { inject, TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';

describe('AuthorizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AuthorizationService ]
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', inject([ AuthorizationService ], (service: AuthorizationService) => {
    expect(service).toBeTruthy();
  }));

  it('should authenticate user on login', inject([ AuthorizationService ], (service: AuthorizationService) => {
    expect(service.isAuthenticated()).toBe(false);

    service.userLogin.subscribe(
      () => expect(service.isAuthenticated()).toBe(true)
    );

    service.login('some_login', 'secret');
  }));

  it('should not authenticate user on logout', inject([ AuthorizationService ], (service: AuthorizationService) => {

    service.userLogin.subscribe(
      (token) => {
        if (token.login) expect(service.isAuthenticated()).toBe(true);
      });
    service.userLogout.subscribe(
      () => expect(service.isAuthenticated()).toBe(false)
    );

    service.login('some_login', 'secret');
    service.logout('some_login');
  }));
});
