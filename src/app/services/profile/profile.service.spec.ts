import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { ProfileService } from './profile.service';
import { User } from './user';
import { Token } from '../auth/token';

describe('AuthorizationService', () => {
  let token: Token;
  let profile: User;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ProfileService ]
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

  it('should be created', inject([ ProfileService ], (service: ProfileService) => {
    expect(service).toBeTruthy();
  }));

  it('should read profile', inject([ ProfileService ], (service: ProfileService) => {
    service.readProfile(token).subscribe(userProfile => expect(userProfile).toEqual(profile));

    const profileRequest = httpTestingController.expectOne('http://localhost:3000/profiles/test');
    expect(profileRequest.request.method).toEqual('GET');
    profileRequest.flush(profile);
  }));

});
