import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscountService } from 'src/app/services/discount.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.css']
})
export class EditDiscountComponent implements OnInit {

  discount: { discountNo:number 
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

  patchValues() {
    this.editDiscountForm.patchValue({
      discountNo :this.discount!.discountNo
      ,discountRate: this.discount!.discountRate
      ,createOn: this.discount!.createOn
      ,startDate: this.discount!.startDate
      ,expirDate: this.discount!.expirDate
      ,discountMaxValue:this.discount!.discountMaxValue
      ,enabled: this.discount!.enabled
      ,createAdm: this.discount!.createAdm 
    })
  }

  constructor(private discountServise:DiscountService ,private activatedroute: ActivatedRoute, private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loading=true;

    const discountid = this.activatedroute.snapshot.paramMap.get('id');
    this.discountServise.getByCode({discountNo:discountid}).subscribe(
      (result) =>{
        if(result.result.status == '200')
        {
          this.discount = result.data.discount;
          this.patchValues();
          this.loading=false;

        }
        else
        {
          this.loading=false;
          this.router.navigate(['/dashboard/discounts']);
        }
      },
      error => {
        this.loading=false;
      });

   
    this.editDiscountForm = this.formBuilder.group({
      discountNo:[''],
      createOn:[''],
      createAdm:[''],
      discountRate: ['', [Validators.required, Validators.pattern('\\d+([.]\\d+)?')]],
      discountMaxValue:[''],
      startDate: ['', [Validators.required]],
      expirDate: ['', [Validators.required]],
      enabled: ['', [Validators.required]]
    });

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
