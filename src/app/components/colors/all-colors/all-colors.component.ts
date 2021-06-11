import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-all-colors',
  templateUrl: './all-colors.component.html',
  styleUrls: ['./all-colors.component.css']
})
export class AllColorsComponent implements OnInit {
  colors: any;

  constructor(private colorServise:ColorService, private router:Router) {}

  ngOnInit(): void {
    this.colorServise.getColors().subscribe(
      (result) =>{
        if(result.result.status == '200')
          this.colors = result.data.colorList;
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
    this.colorServise.delete(color).subscribe(
      (result) =>{
        if(result.result.status == '200')
        window.location.reload();
      }
    );
  }

}
