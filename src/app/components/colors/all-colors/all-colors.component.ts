import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader.service';

@Component({
  selector: 'app-all-colors',
  templateUrl: './all-colors.component.html',
  styleUrls: ['./all-colors.component.css']
})
export class AllColorsComponent implements OnInit {
  colors: any;
  loading:boolean=false;

  constructor(private colorServise:ColorService, private router:Router,private dynamicScriptLoader:DynamicScriptLoaderService) {}

  ngOnInit(): void {
    this.loading=true;
    this.colorServise.getColors().subscribe(
      (result) =>{
        if(result.result.status == '200')
          this.colors = result.data.colorList;
          this.loading = false;
        },
        error=>
        {    
          this.loading = false;
        }
    );
  }
  
  updateColor(color:any)
  {
    const navigationExtras: NavigationExtras = {
      state: {
        colorNo:color.colorNo 
        ,colorNmEn: color.colorNmEn
        ,colorNmAr: color.colorNmAr 
        ,colorCode: color.colorCode
      }
    };
    this.router.navigate(['/dashboard/colors/update-color/'+color.colorNo], navigationExtras);
  }
  deleteColor(color:any)
  {
    this.loading=true;
    this.colorServise.delete(color).subscribe(
      (result) =>{
        if(result.result.status == '200')
        window.location.reload();
        this.loading = false;
      },
      error=>
      {    
        this.loading = false;
      }
    );
  }

}
