import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mainFunctions } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  _allMaterialsUrl = environment.apiUrl+`/lamaderas/v1/PROD/Material/getMaterialList`;
  _createMaterialUrl = environment.apiUrl+`​/lamaderas​/v1​/PROD​/Material​/addMaterial`;
  _deleteMaterialUrl = environment.apiUrl+`/lamaderas/v1/PROD/Material/deleteMaterial`;
  _updateMaterialUrl = environment.apiUrl+`​/lamaderas​/v1​/PROD​/Material​/updateMaterial`;
  _getMaterialByCodeUrl = environment.apiUrl+`​/lamaderas​/v1​/PROD​/Material​/getMaterialByCode`;


  constructor(private http: HttpClient) { }

  getlist(): Observable<any> {
    let request = mainFunctions.requestData();

    return this.http.post<any>(this._allMaterialsUrl, request);
  }

  create(MaterialData: any): Observable<any> {
    let request = mainFunctions.requestData('material' , MaterialData);

    return this.http.post(this._createMaterialUrl,request);
  }

  update(MaterialData: any): Observable<any> {
    let request = mainFunctions.requestData('material' , MaterialData);

    return this.http.post(this._updateMaterialUrl, request);
  }

  delete(MaterialData: any): Observable<any> {
    let request = mainFunctions.requestData('material' , MaterialData);

    return this.http.post(this._deleteMaterialUrl, request);
  }

  getByCode(MaterialData: any): Observable<any> {
    let request = mainFunctions.requestData('material' , MaterialData);

    return this.http.post(this._getMaterialByCodeUrl, request);
  }
}
