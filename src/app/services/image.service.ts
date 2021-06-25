import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mainFunctions } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  
  _deleteImageUrl = environment.apiUrl+'/lamaderas/v1/GNR/Image/deleteImage';
  _updateImageUrl = environment.apiUrl+'/lamaderas/v1/GNR/Image/updateImage';


  constructor(private http: HttpClient) { }


  update(ImageData: any): Observable<any> {
    let request = mainFunctions.requestData('image' , ImageData);

    return this.http.post(this._updateImageUrl, request);
  }

  delete(ImageData: any): Observable<any> {
    let request = mainFunctions.requestData('image' , ImageData);

    return this.http.post(this._deleteImageUrl, request);
  }

}
