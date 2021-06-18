import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialService } from 'src/app/services/material.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.component.html',
  styleUrls: ['./create-material.component.css']
})
export class CreateMaterialComponent implements OnInit {
  createMaterialForm!: FormGroup;
  submitted = false;
  loading:boolean=false;

  constructor(private materialServise:MaterialService , private router:Router,private formBuilder: FormBuilder) {
   }

  ngOnInit(): void {
    this.createMaterialForm = this.formBuilder.group({
      materialNmEn: ['', [Validators.required]],
      materialNmAr: ['', [Validators.required]],
    });
  }

  get f() { return this.createMaterialForm.controls; }

  CreateMaterial()
  {
    this.submitted = true;
      this.loading=true;
      this.materialServise.create(this.createMaterialForm.value).subscribe(
        (result) =>{
          if(result.result.status == '200')
          {
            this.loading=false;
            this.router.navigate(['/dashboard/styles']);
          }
          else if(result.result.status === 422 && typeof result.result.errors != "undefined") 
          {
            let validationErrors = mainFunctions.getError(result.result.errors);
            Object.keys(validationErrors).forEach(prop => {
              const formControl = this.createMaterialForm.get(prop);
              if (formControl) {
                // activate the error message
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
