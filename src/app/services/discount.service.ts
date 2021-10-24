import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mainFunctions } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  _allDiscountsUrl = environment.apiUrl+'/lamaderas/v1/Discount/getDiscountList';
  _updateDiscountUrl = environment.apiUrl+'/lamaderas/v1/Discount/updateDiscount';

  _createDiscountUrl = environment.apiUrl+'/lamaderas/v1/Discount/addDiscount';
  _deleteDiscountUrl = environment.apiUrl+'/lamaderas/v1/Discount/deleteDiscount';
  _getDiscountByCodeUrl = environment.apiUrl+'/lamaderas/v1/Discount/getDiscountByCode';

  constructor(private http: HttpClient) { }

  getDiscount(): Observable<any> {
    let request = mainFunctions.requestData();

    return this.http.post<any>(this._allDiscountsUrl, request);
  }


  update(DiscountData: any): Observable<any> {
    let request = mainFunctions.requestData('discount',DiscountData);

    return this.http.post(this._updateDiscountUrl, request);
  }

  create(DiscountData: any): Observable<any> {
    let request = mainFunctions.requestData('discount' , DiscountData);

    return this.http.post(this._createDiscountUrl,request);
  }
  delete(DiscountData: any): Observable<any> {
    let request = mainFunctions.requestData('discount' , DiscountData);

    return this.http.post(this._deleteDiscountUrl, request);
  }

  getByCode(DiscountData: any): Observable<any> {
    let request = mainFunctions.requestData('discount' , DiscountData);

    return this.http.post(this._getDiscountByCodeUrl, request);
  }

  
}
