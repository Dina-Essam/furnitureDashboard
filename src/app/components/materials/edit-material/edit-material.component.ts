import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from 'src/app/services/material.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent implements OnInit {

  editMaterialForm!: FormGroup;
  submitted = false;
  loading:boolean=false;

  constructor(private materialServise:MaterialService ,private activatedroute: ActivatedRoute ,private router:Router,private formBuilder: FormBuilder) { }
 
  patchValues(material) {
    this.editMaterialForm.patchValue({
      materialNo :material!.materialNo,
      materialNmEn: material!.materialNmEn,
      materialNmAr: material!.materialNmAr
    })
  }


  ngOnInit(): void {
    this.loading=true;
    const materialid = this.activatedroute.snapshot.paramMap.get('id');
    let material:{ materialNo:number,materialNmAr: string ,materialNmEn: string};
    this.materialServise.getByCode({materialNo:materialid}).subscribe(
      (result) =>{
        if(result.result.status == '200')
        {
          material = result.data.material;
          this.patchValues(material);
          this.loading=false;

        }
        else
        {
          this.loading=false;
          this.router.navigate(['/dashboard/materials']);
        }

      },
      error => {
        this.loading=false;
      });

    this.editMaterialForm = this.formBuilder.group({
      materialNo :[],
      materialNmEn: ['', [Validators.required]],
      materialNmAr: ['', [Validators.required]],
    });
  }

  get f() { return this.editMaterialForm.controls; }

  EditMaterial()
  {
      this.submitted = true;
      if(!this.editMaterialForm.invalid)
      {
        this.loading=true;
        this.materialServise.update(this.editMaterialForm.value).subscribe(
          (result) =>{
            if(result.result.status == '200')
            {
              this.loading=false;
              this.router.navigate(['/dashboard/materials']);
            }
            else if(result.result.status === 422 && typeof result.result.errors != "undefined") 
            {
              let validationErrors = mainFunctions.getError(result.result.errors);
              Object.keys(validationErrors).forEach(prop => {
                const formControl = this.editMaterialForm.get(prop);
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
