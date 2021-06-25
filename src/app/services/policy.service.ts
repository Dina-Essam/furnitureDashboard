import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mainFunctions } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  _allPolicysUrl = environment.apiUrl+'​/lamaderas/v1/ADM/Policy/getPolicyList';
  _allActivePolicysUrl = environment.apiUrl+'/lamaderas/v1/ADM/Policy/getActivePolicyList';
  _createPolicyUrl = environment.apiUrl+'/lamaderas/v1/ADM/Policy/addPolicy';
  _addPolicyImageUrl =  environment.apiUrl+'/lamaderas/v1/ADM/Policy/addPolicyImage';
  _deletePolicyUrl = environment.apiUrl+'/lamaderas/v1/ADM/Policy/deletePolicy';
  _updatePolicyUrl = environment.apiUrl+'/lamaderas/v1/ADM/Policy/updatePolicy';
  _getPolicyByCodeUrl = environment.apiUrl+'/lamaderas/v1/ADM/Policy/getPolicyByCode';


  constructor(private http: HttpClient) { }

  getList(): Observable<any> {
    let request = mainFunctions.requestData();

    return this.http.post<any>(this._allPolicysUrl, request);
  }
  getActiveList(): Observable<any> {
    let request = mainFunctions.requestData();

    return this.http.post<any>(this._allActivePolicysUrl, request);
  }
  create(PolicyData: any): Observable<any> {
    let request = mainFunctions.requestData('policy' , PolicyData);

    return this.http.post(this._createPolicyUrl,request);
  }

  update(PolicyData: any): Observable<any> {
    let request = mainFunctions.requestData('policy' , PolicyData);

    return this.http.post(this._updatePolicyUrl, request);
  }

  delete(PolicyData: any): Observable<any> {
    let request = mainFunctions.requestData('policy' , PolicyData);

    return this.http.post(this._deletePolicyUrl, request);
  }

  getByCode(PolicyData: any): Observable<any> {
    let request = mainFunctions.requestData('policy' , PolicyData);

    return this.http.post(this._getPolicyByCodeUrl, request);
  }
}
