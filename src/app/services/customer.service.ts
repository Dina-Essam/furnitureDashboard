import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mainFunctions } from 'src/main';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  _allCustomersUrl =
    environment.apiUrl + '/lamaderas/v1/Customer/getAllCustomers';
  _getByIdCustomerUrl =
    environment.apiUrl + '/lamaderas/v1/Customer/getCustomerByCode';
  _deleteCustomerUrl =
    environment.apiUrl + '/lamaderas/v1/Customer/deleteCustomer';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    let request = mainFunctions.requestData();

    return this.http.post<any>(this._allCustomersUrl, request);
  }

  getById(CustomerData: any): Observable<any> {
    let request = mainFunctions.requestData('customer', CustomerData);

    return this.http.post(this._getByIdCustomerUrl, request);
  }

  delete(CustomerData: any): Observable<any> {
    let request = mainFunctions.requestData('customer', CustomerData);

    return this.http.post(this._deleteCustomerUrl, request);
  }
}
