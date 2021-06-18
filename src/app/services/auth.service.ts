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
  _loginUrl = environment.apiUrl+'/lamaderas/v1/ADM/Admin/login';

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly JWT_ADMINDATA = 'JWT_ADMINDATA';
  constructor(private http: HttpClient) {}

  login(loginData:any): Observable<any> {
    let request = mainFunctions.requestData('loginData' , loginData);
    return this.http.post<any>(this._loginUrl, request)
      .pipe(
        tap(data => {
          if(data.result.status == '200')
            this.storeToken(data.data.token);
            this.storeAdminData(data.data.admin);
        })
        );
  }

  Logout() {
    return localStorage.clear();
  }

  private storeToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  private storeAdminData(admin: any) {
    localStorage.setItem(this.JWT_ADMINDATA, JSON.stringify(admin));
  }

  isLoggedIn() {
    return Boolean(this.getToken());
  }

  getToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getAdminData() {
     let data =localStorage.getItem(this.JWT_ADMINDATA);
     if(data)
      return  JSON.parse(data);
    return null;
  }

}
