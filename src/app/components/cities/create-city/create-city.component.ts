import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrls: ['./create-city.component.css']
})
export class CreateCityComponent implements OnInit {

  createCityForm!: FormGroup;
  submitted = false;
  loading:boolean=false;

  constructor(private cityServise:CityService , private router:Router,private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.createCityForm = this.formBuilder.group({
      cityNmAr: ['', [Validators.required]],
      cityNmEn: ['', [Validators.required]],
      shipPrice:['', [Validators.required, Validators.pattern('\\d+([.]\\d+)?')]]
    });
  }
  get f() { return this.createCityForm.controls; }
  CreateCity()
  {
    this.submitted = true;
    if(!this.createCityForm.invalid)
    {
      this.loading=true;
      this.cityServise.create(this.createCityForm.value).subscribe(
        (result) =>{
          if(result.result.status == '200')
          {
            this.loading=false;
            this.router.navigate(['/dashboard/cities']);
          }
          else if(result.result.status === 422 && typeof result.result.errors != "undefined") 
          {
            let validationErrors = mainFunctions.getError(result.result.errors);
            Object.keys(validationErrors).forEach(prop => {
              const formControl = this.createCityForm.get(prop);
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
        error => {
          this.loading=false;
        } 
      );
    }
      
  }
}
