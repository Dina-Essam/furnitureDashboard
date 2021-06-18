import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DiscountService } from 'src/app/services/discount.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.css']
})
export class EditDiscountComponent implements OnInit {

  discount!: { discountNo:number 
              ,discountRate: string
              ,createOn: string
              ,startDate: string
              ,expirDate: string
              ,discountMaxValue:number|null
              ,enabled: number
              ,createAdm: number };
  editDiscountForm!: FormGroup;
  submitted = false;
  loading:boolean=false;

  constructor(private discountServise:DiscountService , private router:Router,private formBuilder: FormBuilder) {

    const navigation = this.router.getCurrentNavigation();

    if(navigation && navigation.extras?.state)
      this.discount = navigation.extras.state as { 
        discountNo:number 
        ,discountRate: string
        ,createOn: string
        ,startDate: string
        ,expirDate: string
        ,discountMaxValue:number|null
        ,enabled: number
        ,createAdm: number };
    else
      {
        this.discount = { 
          discountNo:-1 
          ,discountRate: ''
          ,createOn: ''
          ,startDate: '2021-03-31'
          ,expirDate: '2021-03-12'
          ,discountMaxValue:null
          ,enabled: 1
          ,createAdm: 1 };
        this.router.navigate(['/dashboard/discounts']);
      }
      
   }

  ngOnInit(): void {

    this.editDiscountForm = this.formBuilder.group({
      discountNo:[this.discount.discountNo],
      createOn:[this.discount.createOn],
      createAdm:[this.discount.createAdm],
      discountRate: ['', [Validators.required, Validators.pattern('\\d+([.]\\d+)?')]],
      discountMaxValue:[''],
      startDate: ['', [Validators.required]],
      expirDate: ['', [Validators.required]],
      enabled: ['', [Validators.required]]
    });

    this.editDiscountForm.setValue(this.discount);
  }
  get f() { return this.editDiscountForm.controls; }

  EditDiscount()
  {
      this.submitted = true;
      this.loading=true;
      this.editDiscountForm.value.enabled = this.editDiscountForm.value.enabled ? 1: 0;
      this.discountServise.update(this.editDiscountForm.value).subscribe(
        (result) =>{
          if(result.result.status == '200')
          {
            this.loading=false;
            this.router.navigate(['/dashboard/discounts']);
          }
          else if(typeof result.result.errors != "undefined") 
          {
            let validationErrors = mainFunctions.getError(result.result.errors);
            Object.keys(validationErrors).forEach(prop => {
              const formControl = this.editDiscountForm.get(prop);
              if (formControl) {
                formControl.setErrors({
                  serverError: validationErrors[prop as any]
                });
              }
            });
          }
          this.loading=false;
        },
        error =>{
          this.loading=false;
        }
      );
  }

}
