import { enableProdMode, Injectable } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

export class mainFunctions
{
  static currentLange=1;
  constructor(){}

  static requestData(DataName?:string , Data?: any) {
    let request;
    if(DataName)
      request = {data:{lngNo:mainFunctions.currentLange, [DataName]:Data}}; 
    else
      request = {data:{lngNo:mainFunctions.currentLange}}; 

    console.log(request);
    return request;
  }

  static getError(error:Array<any>):Array<any>
  {
    let validationErrors: Array<any>=[];

    error.forEach(element => {
      validationErrors.push({[element.name]:element.error})
    });

    return validationErrors;
  }
}


