import { Injectable, VERSION } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { of, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { mainFunctions } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _loginUrl = environment.apiUrl+`/lamaderas/v1/ADM/Admin/login`;

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  constructor(private http: HttpClient) {}

  login(loginData:any): Observable<any> {
    let request = mainFunctions.requestData('loginData' , loginData);
    return this.http.post<any>(this._loginUrl, request)
      .pipe(
        tap(data => {
          if(data.result.status == '200')
            this.storeToken(data.data.token);
        })
        );
  }

  Logout() {
    return localStorage.clear();
  }

  private storeToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  isLoggedIn() {
    return Boolean(this.getToken());
  }

  getToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

}
