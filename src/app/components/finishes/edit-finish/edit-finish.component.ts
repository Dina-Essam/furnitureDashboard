import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FinishService } from 'src/app/services/finish.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-edit-finish',
  templateUrl: './edit-finish.component.html',
  styleUrls: ['./edit-finish.component.css']
})
export class EditFinishComponent implements OnInit {

  editFinishForm!: FormGroup;
  submitted = false;
  loading:boolean=false;

  constructor(private finishServise:FinishService ,private activatedroute: ActivatedRoute ,private router:Router,private formBuilder: FormBuilder) { }

  patchValues(finish) {
    this.editFinishForm.patchValue({
      finishNo :finish!.finishNo,
      finishNmEn: finish!.finishNmEn,
      finishNmAr: finish!.finishNmAr,
    })
  }

  ngOnInit(): void {
    this.loading=true;

    const finishid = this.activatedroute.snapshot.paramMap.get('id');
    let finish:{ finishNo:number,finishNmAr: string ,finishNmEn: string};
    this.finishServise.getByCode({finishNo:finishid}).subscribe(
      (result) =>{
        if(result.result.status == '200')
        {
          finish = result.data.finish;
          this.patchValues(finish) ;
          this.loading=false;
        }
        else
        {
          this.loading=false;
          this.router.navigate(['/dashboard/finishes']);
        }
      },
      error => {
        this.loading=false;
      } 
      );

    this.editFinishForm = this.formBuilder.group({
      finishNo :[],
      finishNmEn: ['', [Validators.required]],
      finishNmAr: ['', [Validators.required]],
    });
  }

  get f() { return this.editFinishForm.controls; }

  EditFinish()
  {
      this.submitted = true;
      this.loading=true;
      this.finishServise.update(this.editFinishForm.value).subscribe(
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
              const formControl = this.editFinishForm.get(prop);
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
