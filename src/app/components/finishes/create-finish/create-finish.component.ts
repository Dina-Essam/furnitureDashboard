import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FinishService } from 'src/app/services/finish.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-create-finish',
  templateUrl: './create-finish.component.html',
  styleUrls: ['./create-finish.component.css']
})
export class CreateFinishComponent implements OnInit {

  createFinishForm!: FormGroup;
  submitted = false;
  loading:boolean=false;

  constructor(private finishServise:FinishService , private router:Router,private formBuilder: FormBuilder) {
   }
  ngOnInit(): void {
    this.createFinishForm = this.formBuilder.group({
      finishNmEn: ['', [Validators.required]],
      finishNmAr: ['', [Validators.required]],
    });
  }
  get f() { return this.createFinishForm.controls; }

  CreateFinish()
  {
    this.submitted = true;
      this.loading=true;
      this.finishServise.create(this.createFinishForm.value).subscribe(
        (result) =>{
          if(result.result.status == '200')
          {
            this.loading=false;
            this.router.navigate(['/dashboard/finishes']);
          }
          else if(result.result.status === 422 && typeof result.result.errors != "undefined") 
          {
            let validationErrors = mainFunctions.getError(result.result.errors);
            Object.keys(validationErrors).forEach(prop => {
              const formControl = this.createFinishForm.get(prop);
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
