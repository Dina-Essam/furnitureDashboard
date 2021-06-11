import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-create-color',
  templateUrl: './create-color.component.html',
  styleUrls: ['./create-color.component.css']
})
export class CreateColorComponent implements OnInit {

  color: { colorNmEn: string ,colorNmAr: string , colorCode: string };
  loading:boolean=false;

  constructor(private colorServise:ColorService , private router:Router) {

    this.color = { colorNmEn: '', colorNmAr: '' ,colorCode: '#824137'};
    
   }

  ngOnInit(): void {
  }

  CreateColor()
  {
      this.loading=true;
      this.colorServise.create(this.color).subscribe(
        (result) =>{
          if(result.result.status == '200')
          {
            this.loading=false;
            this.router.navigate(['/dashboard/colors']);
          }
        }
      );
  }

}
