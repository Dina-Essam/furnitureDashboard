import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DiscountService } from 'src/app/services/discount.service';

@Component({
  selector: 'app-all-discounts',
  templateUrl: './all-discounts.component.html',
  styleUrls: ['./all-discounts.component.css']
})
export class AllDiscountsComponent implements OnInit {
  
  discounts: any;
  loading:boolean=false;


  constructor(private discountServise:DiscountService, private router:Router) { }

  ngOnInit(): void {

    this.loading=true;
    this.discountServise.getDiscount().subscribe(
      (result) =>{
        if(result.result.status == '200')
          this.discounts = [result.data.discount];
          this.loading = false;
        },
        error=>
        {    
          this.loading = false;
        }
    );

  }

  updateDiscount(discount:any)
  {
    const navigationExtras: NavigationExtras = {
      state: {
        discountNo:discount.discountNo 
        ,discountRate: discount.discountRate
        ,createOn: discount.createOn 
        ,startDate: discount.startDate
        ,expirDate: discount.expirDate
        ,discountMaxValue: discount.discountMaxValue
        ,enabled: discount.enabled
        ,createAdm: discount.createAdm
      }
    };
    this.router.navigate(['/dashboard/discounts/update-discount/'+discount.discountNo], navigationExtras);
  }

}
