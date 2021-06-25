import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-edit-category-details',
  templateUrl: './edit-category-details.component.html',
  styleUrls: ['./edit-category-details.component.css']
})
export class EditCategoryDetailsComponent implements OnInit {

  editCategoryForm!: FormGroup;
  submitted = false;
  loading:boolean=false;

  constructor(private categoryServise:CategoryService ,private activatedroute: ActivatedRoute ,private router:Router,private formBuilder: FormBuilder) { }

  patchValues(category) {
    this.editCategoryForm.patchValue({
      catNo :category!.catNo,
      catNameAr: category!.catNameAr,
      catNameEn: category!.catNameEn,
      catDscAr: category!.catDscAr,
      catDscEn: category!.catDscEn,
    })
  }

  ngOnInit(): void {
    this.loading=true;

    const categoryid = this.activatedroute.snapshot.paramMap.get('id');
    let category:{ catNo:number,catNameAr: string ,catNameEn: string,catDscAr: string ,catDscEn: string};
    this.categoryServise.getByCode({catNo:categoryid}).subscribe(
      (result) =>{
        if(result.result.status == '200')
        {
          category = result.data.category;
          this.patchValues(category) ;
          this.loading=false;
        }
        else
        {
          this.loading=false;
          this.router.navigate(['/dashboard/categories']);
        }
      },
      error => {
        this.loading=false;
      } 
      );

    this.editCategoryForm = this.formBuilder.group({
      catNo :[''],
      catNameAr: ['', [Validators.required]],
      catNameEn:['', [Validators.required]],
      catDscAr: ['', [Validators.required]],
      catDscEn: ['', [Validators.required]],
    });
  }

  get f() { return this.editCategoryForm.controls; }

  EditCategory()
  {
      this.submitted = true;
      if(!this.editCategoryForm.invalid)
      {
        this.loading=true;
        this.categoryServise.update(this.editCategoryForm.value).subscribe(
          (result) =>{
            if(result.result.status == '200')
            {
              this.loading=false;
              this.router.navigate(['/dashboard/categories/details-category/'+this.editCategoryForm.value.catNo]);
            }
            else if(result.result.status === 422 && typeof result.result.errors != "undefined") 
            {
              let validationErrors = mainFunctions.getError(result.result.errors);
              Object.keys(validationErrors).forEach(prop => {
                const formControl = this.editCategoryForm.get(prop);
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
