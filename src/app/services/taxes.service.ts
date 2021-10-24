import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mainFunctions } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {

  _allTaxessUrl = environment.apiUrl+'/lamaderas/v1/Taxes/getTaxesList';
  _updateTaxesUrl = environment.apiUrl+'/lamaderas/v1/Taxes/updateTaxes';

  constructor(private http: HttpClient) { }

  getTaxes(): Observable<any> {
    let request = mainFunctions.requestData();

    return this.http.post<any>(this._allTaxessUrl, request);
  }


  update(TaxesData: any): Observable<any> {
    let request = mainFunctions.requestData('taxes',TaxesData);

    return this.http.post(this._updateTaxesUrl, request);
  }
}
