import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mainFunctions } from 'src/main';

@Injectable({
  providedIn: 'root',
})
export class AboutService {

  _allAboutsUrl = environment.apiUrl+'​/lamaderas/v1/About/getAboutList';
  _allActiveAboutsUrl = environment.apiUrl+'/lamaderas/v1/About/getActiveAboutList';
  _createAboutUrl = environment.apiUrl+'/lamaderas/v1/About/addAbout';
  _addAboutImageUrl =  environment.apiUrl+'/lamaderas/v1/About/addAboutImage';
  _deleteAboutUrl = environment.apiUrl+'/lamaderas/v1/About/deleteAbout';
  _updateAboutUrl = environment.apiUrl+'/lamaderas/v1/About/updateAbout';
  _getAboutByCodeUrl = environment.apiUrl+'/lamaderas/v1/About/getAboutByCode';


  constructor(private http: HttpClient) { }

  getList(): Observable<any> {
    let request = mainFunctions.requestData();

    return this.http.post<any>(this._allAboutsUrl, request);
  }
  getActiveList(): Observable<any> {
    let request = mainFunctions.requestData();

    return this.http.post<any>(this._allActiveAboutsUrl, request);
  }
  create(AboutData: any): Observable<any> {
    let request = mainFunctions.requestData('about', AboutData);

    return this.http.post(this._createAboutUrl, request);
  }

  update(AboutData: any): Observable<any> {
    let request = mainFunctions.requestData('about', AboutData);

    return this.http.post(this._updateAboutUrl, request);
  }

  delete(AboutData: any): Observable<any> {
    let request = mainFunctions.requestData('about', AboutData);

    return this.http.post(this._deleteAboutUrl, request);
  }

  getByCode(AboutData: any): Observable<any> {
    let request = mainFunctions.requestData('about', AboutData);

    return this.http.post(this._getAboutByCodeUrl, request);
  }
}
