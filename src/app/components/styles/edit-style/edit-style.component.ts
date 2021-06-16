import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StyleService } from 'src/app/services/style.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-edit-style',
  templateUrl: './edit-style.component.html',
  styleUrls: ['./edit-style.component.css']
})
export class EditStyleComponent implements OnInit {

  editStyleForm!: FormGroup;
  submitted = false;
  loading:boolean=false;

  constructor(private styleServise:StyleService ,private activatedroute: ActivatedRoute ,private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    const styleid = this.activatedroute.snapshot.paramMap.get('id');
    let style:{ styleNo:number,styleNmEn: string ,styleNmAr: string};
    this.styleServise.getByCode({styleNo:styleid}).subscribe(
      (result) =>{
        if(result.result.status == '200')
        {
          style = result.result.data;
        }
        else
          this.router.navigate(['/dashboard/styles']);

      });

    this.editStyleForm = this.formBuilder.group({
      styleNo :[style!.styleNo],
      styleNmEn: [style!.styleNmEn, [Validators.required]],
      styleNmAr: [style!.styleNmAr, [Validators.required]],
    });
  }
  get f() { return this.editStyleForm.controls; }

  EditStyle()
  {
      this.submitted = true;
      this.loading=true;
      this.styleServise.update(this.editStyleForm.value).subscribe(
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
              const formControl = this.editStyleForm.get(prop);
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
  }

}
