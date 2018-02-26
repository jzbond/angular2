import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { AuthorizationService } from './authorization.service';
import { Token } from './token';

describe('AuthorizationService', () => {
  let token: Token;
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
  });

  afterEach(() => {
    localStorage.clear();
    httpTestingController.verify();
  });

  it('should be created', inject([ AuthorizationService ], (service: AuthorizationService) => {
    expect(service).toBeTruthy();
  }));

  it('should authenticate user on login', inject([ AuthorizationService ], (service: AuthorizationService) => {
    service.login({ login: 'test', password: 'secret' }).subscribe(authToken => expect(authToken).toEqual(token));

    const authRequest = httpTestingController.expectOne('http://localhost:3000/login/test');
    expect(authRequest.request.method).toEqual('GET');
    authRequest.flush(token);
  }));
});
