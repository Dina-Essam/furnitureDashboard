import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AboutService } from 'src/app/services/about.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-create-about',
  templateUrl: './create-about.component.html',
  styleUrls: ['./create-about.component.css']
})
export class CreateAboutComponent implements OnInit {

  createAboutForm!: FormGroup;
  submitted = false;
  loading:boolean=false;

  constructor(private aboutServise:AboutService , private router:Router,private formBuilder: FormBuilder) {
   }
  ngOnInit(): void {
    this.createAboutForm = this.formBuilder.group({
      orderNo: ['', [Validators.required, Validators.pattern('\\d+([.]\\d+)?')]],
      aboutTxtAr: ['', [Validators.required]],
      aboutTxtEn: ['', [Validators.required]],
      enabled: ['', [Validators.required]]
    });
  }
  get f() { return this.createAboutForm.controls; }

  CreateAbout()
  {
    this.submitted = true;
    if(!this.createAboutForm.invalid)
    {
      this.loading=true;
      this.createAboutForm.value.enabled = this.createAboutForm.value.enabled ? 1: 0;
      this.aboutServise.create(this.createAboutForm.value).subscribe(
        (result) =>{
          if(result.result.status == '200')
          {
            this.loading=false;
            this.router.navigate(['/dashboard/abouts']);
          }
          else if(typeof result.result.errors != "undefined") 
          {
            let validationErrors = mainFunctions.getError(result.result.errors);
            Object.keys(validationErrors).forEach(prop => {
              const formControl = this.createAboutForm.get(prop);
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
