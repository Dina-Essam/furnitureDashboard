import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mainFunctions } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  _allCitiesUrl = environment.apiUrl+`/lamaderas/v1/ADM/City/getCityList`;
  _createCityUrl = environment.apiUrl+`​/lamaderas/v1/ADM/City/addCity`;
  _deleteCityUrl = environment.apiUrl+`/lamaderas​/v1​/ADM​/City​/deleteCity`;
  _updateCityUrl = environment.apiUrl+`​/lamaderas​/v1​/ADM​/City​/updateCity`;
  _getCityByCodeUrl = environment.apiUrl+`​/lamaderas​/v1​/ADM​/City​/getCityByCode`;


  constructor(private http: HttpClient) { }

  getlist(): Observable<any> {
    let request = mainFunctions.requestData();

    return this.http.post<any>(this._allCitiesUrl, request);
  }

  create(CityData: any): Observable<any> {
    let request = mainFunctions.requestData('city' , CityData);
    return this.http.post(this._createCityUrl,request);
  }

  update(CityData: any): Observable<any> {
    let request = mainFunctions.requestData('city' , CityData);

    return this.http.post(this._updateCityUrl, request);
  }

  delete(CityData: any): Observable<any> {
    let request = mainFunctions.requestData('city' , CityData);

    return this.http.post(this._deleteCityUrl, request);
  }

  getByCode(CityData: any): Observable<any> {
    let request = mainFunctions.requestData('city' , CityData);

    return this.http.post(this._getCityByCodeUrl, request);
  }


}
