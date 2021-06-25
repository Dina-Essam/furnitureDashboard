import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PolicyService } from 'src/app/services/policy.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.css']
})
export class CreatePolicyComponent implements OnInit {

  createPolicyForm!: FormGroup;
  submitted = false;
  loading:boolean=false;

  constructor(private policyServise:PolicyService , private router:Router,private formBuilder: FormBuilder) {
   }
  ngOnInit(): void {
    this.createPolicyForm = this.formBuilder.group({
      orderNo: ['', [Validators.required, Validators.pattern('\\d+([.]\\d+)?')]],
      policyTxtAr: ['', [Validators.required]],
      policyTxtEn: ['', [Validators.required]],
      enabled: ['', [Validators.required]]
    });
  }
  get f() { return this.createPolicyForm.controls; }

  CreatePolicy()
  {
      this.submitted = true;
      if(!this.createPolicyForm.invalid)
      {
        this.loading=true;
        this.createPolicyForm.value.enabled = this.createPolicyForm.value.enabled ? 1: 0;
        this.policyServise.create(this.createPolicyForm.value).subscribe(
          (result) =>{
            if(result.result.status == '200')
            {
              this.loading=false;
              this.router.navigate(['/dashboard/policies']);
            }
            else if(typeof result.result.errors != "undefined") 
            {
              let validationErrors = mainFunctions.getError(result.result.errors);
              Object.keys(validationErrors).forEach(prop => {
                const formControl = this.createPolicyForm.get(prop);
                if (formControl) {
                  // activate the error message
                  formControl.setErrors({
                    serverError: validationErrors[prop as any]
                  });
                }
              });
              this.loading=false;
            }
            this.loading=false;
          },
          error =>{
            this.loading=false;
          }
        );
      }
      
  }

}
