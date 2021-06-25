import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit {

  editCityForm!: FormGroup;
  submitted = false;
  loading:boolean=false;

  constructor(private cityServise:CityService ,private activatedroute: ActivatedRoute ,private router:Router,private formBuilder: FormBuilder) { }

  patchValues(city) {
    this.editCityForm.patchValue({
      cityNo :city!.finishNo,
      cityNmEn: city!.finishNmEn,
      cityNmAr: city!.finishNmAr,
      shipPrice: city!.shipPrice
    })
  }
  ngOnInit(): void {

    this.loading=true;

    const cityid = this.activatedroute.snapshot.paramMap.get('id');
    let city:{ cityNo:number,cityNmAr: string ,cityNmEn: string , shipPrice: string};
    this.cityServise.getByCode({cityNo:cityid}).subscribe(
      (result) =>{
        if(result.result.status == '200')
        {
          city = result.data.finish;
          this.patchValues(city) ;
          this.loading=false;
        }
        else
        {
          this.loading=false;
          this.router.navigate(['/dashboard/cities']);
        }
      },
      error => {
        this.loading=false;
      } 
      );

    this.editCityForm = this.formBuilder.group({
      cityNo :[],
      cityNmAr: ['', [Validators.required]],
      cityNmEn: ['', [Validators.required]],
      shipPrice:['', [Validators.required, Validators.pattern('\\d+([.]\\d+)?')]]
    });

  }

  get f() { return this.editCityForm.controls; }

  EditCity()
  {
      this.submitted = true;
      if(!this.editCityForm.invalid)
      {
        this.loading=true;
        this.cityServise.update(this.editCityForm.value).subscribe(
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
                const formControl = this.editCityForm.get(prop);
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

}
