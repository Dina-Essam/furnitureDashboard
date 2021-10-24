import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mainFunctions } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class FinishService {

  _allFinishesUrl = environment.apiUrl+'/lamaderas/v1/Finish/getFinishList';
  _createFinishUrl = environment.apiUrl+'/lamaderas/v1/Finish/addFinish';
  _deleteFinishUrl = environment.apiUrl+'/lamaderas/v1/Finish/deleteFinish';
  _updateFinishUrl = environment.apiUrl+'/lamaderas/v1/Finish/updateFinish';
  _getFinishByCodeUrl = environment.apiUrl+'/lamaderas/v1/Finish/getFinishByCode';


  constructor(private http: HttpClient) { }

  getList(): Observable<any> {
    let request = mainFunctions.requestData();

    return this.http.post<any>(this._allFinishesUrl, request);
  }

  create(FinishData: any): Observable<any> {
    let request = mainFunctions.requestData('finish' , FinishData);

    return this.http.post(this._createFinishUrl,request);
  }

  update(FinishData: any): Observable<any> {
    let request = mainFunctions.requestData('finish' , FinishData);

    return this.http.post(this._updateFinishUrl, request);
  }

  delete(FinishData: any): Observable<any> {
    let request = mainFunctions.requestData('finish' , FinishData);

    return this.http.post(this._deleteFinishUrl, request);
  }

  getByCode(FinishData: any): Observable<any> {
    let request = mainFunctions.requestData('finish' , FinishData);

    return this.http.post(this._getFinishByCodeUrl, request);
  }
}
