import { Component, ViewEncapsulation } from '@angular/core';
import { DynamicScriptLoaderService } from './services/dynamic-script-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard';

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) {}

  ngOnInit() {
    this.loadScripts();
  }
  
  private loadScripts() {
    this.dynamicScriptLoader.load().then(data => {
    }).catch(error => console.log(error));
  }
}
