import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user';
import { Token } from '../auth/token';


@Injectable()
export class ProfileService {
  private static readonly SERVER_BASE_URL: String = 'http://localhost:3000';

  constructor(private readonly httpClient: HttpClient) {
  }

  public readProfile(user: Token): Observable<User> {
    return this.httpClient.get<User>(`${ProfileService.SERVER_BASE_URL}/profiles/${user.id}`);
  }
}
