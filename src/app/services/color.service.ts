import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { mainFunctions } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  _allColorsUrl = environment.apiUrl+`/lamaderas/v1/PROD/Color/getColorList`;
  _createColorsUrl = environment.apiUrl+`/lamaderas/v1/PROD/Color/addColor`;
  _deleteColorsUrl = environment.apiUrl+`/lamaderas/v1/PROD/Color/deleteColor`;
  _updateColorsUrl = environment.apiUrl+`/lamaderas/v1/PROD/Color/updateColor`;


  constructor(private http: HttpClient) { }

  getColors(): Observable<any> {
    let request = mainFunctions.requestData();

    return this.http.post<any>(this._allColorsUrl, request);
  }

  create(ColorData: any): Observable<any> {
    let request = mainFunctions.requestData('color' , ColorData);

    return this.http.post(this._createColorsUrl,request);
  }

  update(ColorData: any): Observable<any> {
    let request = mainFunctions.requestData('color' , ColorData);

    return this.http.post(this._updateColorsUrl, request);
  }

  delete(ColorData: any): Observable<any> {
    let request = mainFunctions.requestData('color' , ColorData);

    return this.http.post(this._deleteColorsUrl, request);
  }

}
