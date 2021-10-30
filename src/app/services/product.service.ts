import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mainFunctions } from 'src/main';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  _allProductsUrl = environment.apiUrl+'/lamaderas/v1/Product/getProductList';
  _createProductUrl = environment.apiUrl+'/lamaderas/v1/Product/addProduct';
  _deleteProductUrl = environment.apiUrl+'/lamaderas/v1/Product/deleteProduct';
  _getProductByCodeUrl = environment.apiUrl+'/lamaderas/v1/Product/getProductByCode';
  _getpreAddUpdUrl = environment.apiUrl+'/lamaderas/v1/Product/preAddUpd';


  constructor(private http: HttpClient) { }

  getList(): Observable<any> {
    let request = mainFunctions.requestData();

    return this.http.post<any>(this._allProductsUrl, request);
  }
  create(ProductData: any): Observable<any> {
    let request = mainFunctions.requestData('product', ProductData);
    // let headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    return this.http.post(this._createProductUrl, request);
  }

  createData(): Observable<any> {
    let request = mainFunctions.requestData();
    return this.http.post(this._getpreAddUpdUrl, request);
  }

  delete(ProductData: any): Observable<any> {
    let request = mainFunctions.requestData('product', ProductData);

    return this.http.post(this._deleteProductUrl, request);
  }

  getByCode(ProductData: any): Observable<any> {
    let request = mainFunctions.requestData('product', ProductData);

    return this.http.post(this._getProductByCodeUrl, request);
  }


}
