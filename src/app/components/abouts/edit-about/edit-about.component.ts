import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutService } from 'src/app/services/about.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent implements OnInit {
  about: { 
    aboutNo:number 
    ,orderNo: string
    ,aboutTxtAr: string
    ,aboutTxtEn: string
    ,enabled: number
    };
  editAboutForm!: FormGroup;
  submitted = false;
  loading:boolean=false;

  patchValues() {
    this.editAboutForm.patchValue({
      aboutNo :this.about!.aboutNo
      ,orderNo: this.about!.orderNo
      ,aboutTxtAr: this.about!.aboutTxtAr
      ,aboutTxtEn: this.about!.aboutTxtEn
      ,enabled: this.about!.enabled
    })
  }


  constructor(private aboutServise:AboutService ,private activatedroute: ActivatedRoute, private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loading=true;

    const aboutid = this.activatedroute.snapshot.paramMap.get('id');
    this.aboutServise.getByCode({aboutNo:aboutid}).subscribe(
      (result) =>{
        if(result.result.status == '200')
        {
          this.about = result.data.about;
          this.patchValues();
          this.loading=false;

        }
        else
        {
          this.loading=false;
          this.router.navigate(['/dashboard/abouts']);
        }
      },
      error => {
        this.loading=false;
      });

   
    this.editAboutForm = this.formBuilder.group({
      aboutNo:[''],
      orderNo: ['', [Validators.required, Validators.pattern('\\d+([.]\\d+)?')]],
      aboutTxtAr: ['', [Validators.required]],
      aboutTxtEn: ['', [Validators.required]],
      enabled: ['', [Validators.required]]
    });

  }
  get f() { return this.editAboutForm.controls; }

  EditAbout()
  {
      this.submitted = true;
      if(!this.editAboutForm.invalid)
      {
        this.loading=true;
        this.editAboutForm.value.enabled = this.editAboutForm.value.enabled ? 1: 0;
        this.aboutServise.update(this.editAboutForm.value).subscribe(
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
                const formControl = this.editAboutForm.get(prop);
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
