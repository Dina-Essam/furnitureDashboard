import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mainFunctions } from 'src/main';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  _allCategoriesUrl = environment.apiUrl+'/lamaderas/v1/Category/getCategoryList';
  _createCategoryUrl = environment.apiUrl+'/lamaderas/v1/Category/addCategory';
  _deleteCategoryUrl = environment.apiUrl+'/lamaderas/v1/Category/deleteCategory';
  _updateCategoryUrl = environment.apiUrl+'/lamaderas/v1/Category/updateCategory';
  _getCategoryByCodeUrl = environment.apiUrl+'/lamaderas/v1/Category/getCategoryByCode';

  constructor(private http: HttpClient) { }


  getList(): Observable<any> {
    let request = mainFunctions.requestData();

    return this.http.post<any>(this._allCategoriesUrl, request);
  }
  create(CategoryData: any): Observable<any> {
    let request = mainFunctions.requestData('category', CategoryData);
    let headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    return this.http.post(this._createCategoryUrl, request, {
      headers: headers,
    });
  }

  update(CategoryData: any): Observable<any> {
    let request = mainFunctions.requestData('category', CategoryData);

    return this.http.post(this._updateCategoryUrl, request);
  }

  delete(CategoryData: any): Observable<any> {
    let request = mainFunctions.requestData('category', CategoryData);

    return this.http.post(this._deleteCategoryUrl, request);
  }

  getByCode(CategoryData: any): Observable<any> {
    let request = mainFunctions.requestData('category', CategoryData);

    return this.http.post(this._getCategoryByCodeUrl, request);
  }
}
