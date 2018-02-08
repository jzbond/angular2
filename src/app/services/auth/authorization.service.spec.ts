import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { AuthorizationService } from './authorization.service';
import { Token } from './token';
import { User } from './user';

describe('AuthorizationService', () => {
  let token: Token;
  let profile: User;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AuthorizationService ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    token = {
      id: 'test',
      token: 'test_token'
    };
    profile = {
      id: 'test',
      name: 'name',
      surname: 'surname',
    };
  });

  afterEach(() => {
    localStorage.clear();
    httpTestingController.verify();
  });

  it('should be created', inject([ AuthorizationService ], (service: AuthorizationService) => {
    expect(service).toBeTruthy();
  }));

  it('should authenticate user on login', inject([ AuthorizationService ], (service: AuthorizationService) => {
    expect(service.isAuthenticated()).toBe(false);

    service.profile.subscribe(
      () => expect(service.isAuthenticated()).toBe(true),
      fail
    );

    service.login('test', 'secret');

    // auth request
    const authRequest = httpTestingController.expectOne('http://localhost:3000/login/test');
    expect(authRequest.request.method).toEqual('GET');
    authRequest.flush(token);
    // profile request
    const profileRequest = httpTestingController.expectOne('http://localhost:3000/profiles/test');
    expect(profileRequest.request.method).toEqual('GET');
    profileRequest.flush(profile);
  }));

  it('should not authenticate user on logout', inject([ AuthorizationService ], (service: AuthorizationService) => {

    service.profile.subscribe(
      (token) => {
        if (token.id === 'test') {
          expect(service.isAuthenticated()).toBe(true);
        } else {
          expect(service.isAuthenticated()).toBe(false);
        }
      });
    service.userLogout.subscribe(
      () => expect(service.isAuthenticated()).toBe(false)
    );

    service.login('test', 'secret');
    // auth request
    httpTestingController.expectOne('http://localhost:3000/login/test').flush(token);
    // profile request
    httpTestingController.expectOne('http://localhost:3000/profiles/test').flush(profile);


    service.logout('test');
  }));
});
