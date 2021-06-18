import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TaxesService } from 'src/app/services/taxes.service';

@Component({
  selector: 'app-all-taxes',
  templateUrl: './all-taxes.component.html',
  styleUrls: ['./all-taxes.component.css']
})
export class AllTaxesComponent implements OnInit {

  taxes:any;
  loading:boolean=false;


  constructor(private taxesService:TaxesService, private router:Router) { }

  ngOnInit(): void {
    
    this.loading=true;
    this.taxesService.getTaxes().subscribe(
      (result) =>{
        if(result.result.status == '200')
          this.taxes = [result.data.taxes];
          this.loading = false;
        },
        error=>
        {    
          this.loading = false;
        }
    );

  }

  updateTax(taxes:any)
  {

    const navigationExtras: NavigationExtras = {
      state: {
        taxNo:taxes.taxNo 
        ,percentage: taxes.percentage
        ,createOn: taxes.createOn 
        ,enabled: taxes.enabled
        ,createAdm: taxes.createAdm
      }
    };
    this.router.navigate(['/dashboard/taxes/update-tax/'+taxes.taxNo], navigationExtras);

  }

}
