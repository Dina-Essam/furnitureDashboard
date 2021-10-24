import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mainFunctions } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  _allStylesUrl = environment.apiUrl+'/lamaderas/v1/Style/getStyleList';
  _createStyleUrl = environment.apiUrl+'/lamaderas/v1/Style/addStyle';
  _deleteStyleUrl = environment.apiUrl+'/lamaderas/v1/Style/deleteStyle';
  _updateStyleUrl = environment.apiUrl+'/lamaderas/v1/Style/updateStyle';
  _getStyleByCodeUrl = environment.apiUrl+'/lamaderas/v1/Style/getStyleByCode';


  constructor(private http: HttpClient) { }

  getStyles(): Observable<any> {
    let request = mainFunctions.requestData();

    return this.http.post<any>(this._allStylesUrl, request);
  }

  create(StyleData: any): Observable<any> {
    let request = mainFunctions.requestData('style' , StyleData);

    return this.http.post(this._createStyleUrl,request);
  }

  update(StyleData: any): Observable<any> {
    let request = mainFunctions.requestData('style' , StyleData);

    return this.http.post(this._updateStyleUrl, request);
  }

  delete(StyleData: any): Observable<any> {
    let request = mainFunctions.requestData('style' , StyleData);

    return this.http.post(this._deleteStyleUrl, request);
  }

  getByCode(StyleData: any): Observable<any> {
    let request = mainFunctions.requestData('style' , StyleData);

    return this.http.post(this._getStyleByCodeUrl, request);
  }

}
