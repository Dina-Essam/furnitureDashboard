import { Injectable } from '@angular/core';
import { test1 } from '../../assets/js/script';


interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'script', src: '../../assets/js/script.js' },
  { name: 'custom-dashboard', src: '../../assets/pages/dashboard/custom-dashboard.js' },
  { name: 'jquery.slimscroll', src: '../../assets/js/jquery-slimscroll/jquery.slimscroll.js'},
  { name: 'SmoothScroll', src: '../../assets/js/SmoothScroll.js'},
  { name: 'mCustomScrollbar', src: '../../assets/js/jquery.mCustomScrollbar.concat.min.js'},
  { name: 'modernizr', src: '../../assets/js/modernizr/modernizr.js'},
  { name: 'pcoded', src: '../../assets/js/pcoded.min.js'},
  { name: 'vertical-layout', src: '../../assets/js/vertical-layout.min.js'}
];

declare var document: any;


@Injectable({
  providedIn: 'root'
})
export class DynamicScriptLoaderService {
  
  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load() {
    let scripts = ['script','custom-dashboard','jquery.slimscroll','SmoothScroll','mCustomScrollbar','modernizr','pcoded','vertical-layout'];
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }


  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                }
            };
        } else {  //Others
            script.onload = () => {
                this.scripts[name].loaded = true;
                resolve({script: name, loaded: true, status: 'Loaded'});
            };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }


}
