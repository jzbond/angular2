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

    service.login('some_login', 'secret');

    expect(service.isAuthenticated()).toBe(true);
  }));

  it('should not authenticate user on logout', inject([ AuthorizationService ], (service: AuthorizationService) => {
    service.login('some_login', 'secret');
    expect(service.isAuthenticated()).toBe(true);

    service.logout();

    expect(service.isAuthenticated()).toBe(false);
  }));

  it('should return login for authenticated user', inject([ AuthorizationService ], (service: AuthorizationService) => {
    expect(service.getUserInfo()).toBeNull();

    service.login('some_login', 'secret');

    expect(service.getUserInfo()).toBe('some_login');
  }));
});
