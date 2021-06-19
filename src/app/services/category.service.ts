import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mainFunctions } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  _allCategoriesUrl = environment.apiUrl+'/lamaderas/v1/ADM/Category/getCategoryList';
  _createCategoryUrl = environment.apiUrl+'/lamaderas/v1/ADM/Category/addCategory';
  _deleteCategoryUrl = environment.apiUrl+'/lamaderas/v1/ADM/Category/deleteCategory';
  _updateCategoryUrl = environment.apiUrl+'/lamaderas/v1/ADM/Category/updateCategory';
  _getCategoryByCodeUrl = environment.apiUrl+'/lamaderas/v1/ADM/Category/getCategoryByCode';

  constructor(private http: HttpClient) { }

  getList(): Observable<any> {
    let request = mainFunctions.requestData();

    return this.http.post<any>(this._allCategoriesUrl, request);
  }
  create(CategoryData: any): Observable<any> {
    let request = mainFunctions.requestData('category' , CategoryData);

    return this.http.post(this._createCategoryUrl,request);
  }

  update(CategoryData: any): Observable<any> {
    let request = mainFunctions.requestData('category' , CategoryData);

    return this.http.post(this._updateCategoryUrl, request);
  }

  delete(CategoryData: any): Observable<any> {
    let request = mainFunctions.requestData('category' , CategoryData);

    return this.http.post(this._deleteCategoryUrl, request);
  }

  getByCode(CategoryData: any): Observable<any> {
    let request = mainFunctions.requestData('category' , CategoryData);

    return this.http.post(this._getCategoryByCodeUrl, request);
  }
}
