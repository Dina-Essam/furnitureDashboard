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
  constructor(){}

  static requestData(DataName?:string , Data?: any) {
    let request;
    if(DataName)
      request = {data:{lngNo:mainFunctions.getCurrentLanguage(), [DataName]:Data}}; 
    else
      request = {data:{lngNo:mainFunctions.getCurrentLanguage()}}; 

    console.log(request);
    return request;
  }

  static getCurrentLanguage()
  {
    if (!localStorage.getItem('CURRENT_LANGAGE'))
          localStorage.setItem('CURRENT_LANGAGE', '1');
    var y: number = +localStorage.getItem('CURRENT_LANGAGE');
    return y;
  }

  static setCurrentLanguage(value)
  {
    localStorage.setItem('CURRENT_LANGAGE', value);
  }

  static getError(error:Array<any>):{[key: string]: any}
  {
    let validationErrors: {[key: string]: any}={};

    error.forEach(element => {
      validationErrors[element.fldNm]=element.errMsg;
    });

    return validationErrors;
  }
}


