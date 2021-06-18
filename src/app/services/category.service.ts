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
 

  constructor(private http: HttpClient) { }

  getList(): Observable<any> {
    let request = mainFunctions.requestData();

    return this.http.post<any>(this._allCategoriesUrl, request);
  }
}
