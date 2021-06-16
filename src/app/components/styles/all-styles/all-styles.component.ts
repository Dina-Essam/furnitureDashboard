import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StyleService } from 'src/app/services/style.service';

@Component({
  selector: 'app-all-styles',
  templateUrl: './all-styles.component.html',
  styleUrls: ['./all-styles.component.css']
})
export class AllStylesComponent implements OnInit {

  styles: any;
  loading:boolean=false;

  constructor(private styleServise:StyleService, private router:Router) {}


  ngOnInit(): void {
    this.loading = true;
    this.styleServise.getStyles().subscribe(
      (result) =>{
        if(result.result.status == '200')
          this.styles = result.data.styleList;
      }
    );
    this.loading = false;
  }

  updateStyle(style:any)
  {
    this.router.navigate(['/dashboard/styles/update-style/'+style.styleNo]);
  }

  deleteStyle(style:any)
  {
    this.styleServise.delete(style).subscribe(
      (result) =>{
        if(result.result.status == '200')
        window.location.reload();
      }
    );
  }

}
