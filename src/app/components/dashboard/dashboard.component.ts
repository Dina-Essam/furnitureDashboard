import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  ngOnInit(): void {
    if (!localStorage.getItem('Reload')) { 
      localStorage.setItem('Reload', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('Reload') 
    }
  }

}
