import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaxesService } from 'src/app/services/taxes.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-edit-tax',
  templateUrl: './edit-tax.component.html',
  styleUrls: ['./edit-tax.component.css']
})
export class EditTaxComponent implements OnInit {

  tax!: {
    taxNo:number 
    ,percentage: string
    ,createOn: string
    ,enabled: number
    ,createAdm: number };
editTaxForm!: FormGroup;
submitted = false;
loading:boolean=false;

  constructor(private taxesService:TaxesService , private router:Router,private formBuilder: FormBuilder)
  {
    const navigation = this.router.getCurrentNavigation();

    if(navigation && navigation.extras?.state)
      this.tax = navigation.extras.state as { 
        taxNo:number 
        ,percentage: string
        ,createOn: string
        ,enabled: number
        ,createAdm: number };
    else
    {
      this.tax = { 
        taxNo:-1 
        ,percentage: ''
        ,createOn: ''
        ,enabled: 1
        ,createAdm: 1 };
      this.router.navigate(['/dashboard/taxes']);
    }
  }

  ngOnInit(): void {

    this.editTaxForm = this.formBuilder.group({
      taxNo:[this.tax.taxNo],
      createOn:[this.tax.createOn],
      createAdm:[this.tax.createAdm],
      percentage: ['', [Validators.required, Validators.pattern('\\d+([.]\\d+)?')]],
      enabled: ['', [Validators.required]]
    });

    this.editTaxForm.setValue(this.tax);

  }

  get f() { return this.editTaxForm.controls; }
  EditTax()
  {
      this.submitted = true;
      this.loading=true;
      this.editTaxForm.value.enabled = this.editTaxForm.value.enabled ? 1: 0;
      this.taxesService.update(this.editTaxForm.value).subscribe(
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
              const formControl = this.editTaxForm.get(prop);
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
