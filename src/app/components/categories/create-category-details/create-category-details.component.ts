import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-create-category-details',
  templateUrl: './create-category-details.component.html',
  styleUrls: ['./create-category-details.component.css']
})
export class CreateCategoryDetailsComponent implements OnInit {

  createCategoryForm: FormGroup;
  submitted = false;
  loading:boolean=false;

    constructor(private categoryServise:CategoryService , private router:Router,private formBuilder: FormBuilder) {
    }
  ngOnInit(): void {
    this.createCategoryForm = this.formBuilder.group({
      catNameAr: ['', [Validators.required]],
      catNameEn:['', [Validators.required]],
      catDscAr: ['', [Validators.required]],
      catDscEn: ['', [Validators.required]],
      images:['',[Validators.required]]
    });
  }
  get f() { return this.createCategoryForm.controls; }

  handleFile(event) {
    const formData: FormData = new FormData();

    const files=event.target.files;

    Array.prototype.forEach.call(files, function(file) {
      formData.append("image", file, file.name);
    });

    this.createCategoryForm.patchValue({images:formData});
    this.createCategoryForm.updateValueAndValidity();
  }

  CreateCategory()
  {
    this.submitted = true;
    if(!this.createCategoryForm.invalid)
    {
      this.loading=true;
      this.categoryServise.create(this.createCategoryForm.value).subscribe(
        (result) =>{
          if(result.result.status == '200')
          {
            this.loading=false;
            this.router.navigate(['/dashboard/categories']);
          }
          else if(result.result.status === 422 && typeof result.result.errors != "undefined") 
          {
            let validationErrors = mainFunctions.getError(result.result.errors);
            Object.keys(validationErrors).forEach(prop => {
              const formControl = this.createCategoryForm.get(prop);
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
