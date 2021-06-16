import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StyleService } from 'src/app/services/style.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-create-style',
  templateUrl: './create-style.component.html',
  styleUrls: ['./create-style.component.css']
})
export class CreateStyleComponent implements OnInit {

  createStyleForm!: FormGroup;
  submitted = false;
  loading:boolean=false;

  constructor(private styleServise:StyleService , private router:Router,private formBuilder: FormBuilder) {
   }

  ngOnInit(): void {
    this.createStyleForm = this.formBuilder.group({
      styleNmEn: ['', [Validators.required]],
      styleNmAr: ['', [Validators.required]],
    });
  }

  get f() { return this.createStyleForm.controls; }

  CreateStyle()
  {
    this.submitted = true;
      this.loading=true;
      this.styleServise.create(this.createStyleForm.value).subscribe(
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
              const formControl = this.createStyleForm.get(prop);
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: validationErrors[prop as any]
                });
              }
            });
            this.loading=false;
          }
        }
      );
      this.loading=false;
  }


}
