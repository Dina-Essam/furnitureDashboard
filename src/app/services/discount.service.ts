import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mainFunctions } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  _allDiscountssUrl = environment.apiUrl+`/lamaderas/v1/FIN/Discount/getDiscountList`;
  _updateDiscountUrl = environment.apiUrl+`/lamaderas/v1/FIN/Discount/updateDiscount`;

  constructor(private http: HttpClient) { }

  getDiscount(): Observable<any> {
    let request = mainFunctions.requestData();

    return this.http.post<any>(this._allDiscountssUrl, request);
  }


  update(DiscountData: any): Observable<any> {
    let request = mainFunctions.requestData('discount',DiscountData);

    return this.http.post(this._updateDiscountUrl, request);
  }
}
