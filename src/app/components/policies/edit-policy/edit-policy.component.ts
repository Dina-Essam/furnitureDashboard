import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyService } from 'src/app/services/policy.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-edit-policy',
  templateUrl: './edit-policy.component.html',
  styleUrls: ['./edit-policy.component.css']
})
export class EditPolicyComponent implements OnInit {

  policy: { 
    policyNo:number 
    ,orderNo: string
    ,policyTxtAr: string
    ,policyTxtEn: string
    ,enabled: number
    };
    editPolicyForm!: FormGroup;
  submitted = false;
  loading:boolean=false;

  patchValues() {
    this.editPolicyForm.patchValue({
      policyNo :this.policy!.policyNo
      ,orderNo: this.policy!.orderNo
      ,policyTxtAr: this.policy!.policyTxtAr
      ,policyTxtEn: this.policy!.policyTxtEn
      ,enabled: this.policy!.enabled
    })
  }


  constructor(private policyServise:PolicyService ,private activatedroute: ActivatedRoute, private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loading=true;

    const policyid = this.activatedroute.snapshot.paramMap.get('id');
    this.policyServise.getByCode({policyNo:policyid}).subscribe(
      (result) =>{
        if(result.result.status == '200')
        {
          this.policy = result.data.policy;
          this.patchValues();
          this.loading=false;

        }
        else
        {
          this.loading=false;
          this.router.navigate(['/dashboard/policies']);
        }
      },
      error => {
        this.loading=false;
      });

   
    this.editPolicyForm = this.formBuilder.group({
      policyNo:[''],
      orderNo: ['', [Validators.required, Validators.pattern('\\d+([.]\\d+)?')]],
      policyTxtAr: ['', [Validators.required]],
      policyTxtEn: ['', [Validators.required]],
      enabled: ['', [Validators.required]]
    });

  }
  get f() { return this.editPolicyForm.controls; }

  EditPolicy()
  {
      this.submitted = true;
      if(!this.editPolicyForm.invalid)
      {
        this.loading=true;
        this.editPolicyForm.value.enabled = this.editPolicyForm.value.enabled ? 1: 0;
        this.policyServise.update(this.editPolicyForm.value).subscribe(
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
                const formControl = this.editPolicyForm.get(prop);
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



}
