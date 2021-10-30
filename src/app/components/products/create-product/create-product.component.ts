import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';
import { ProductService } from 'src/app/services/product.service';
import { TaxesService } from 'src/app/services/taxes.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  discountList:any;
  taxes:any
  materialList:any;
  styleList:any;
  categoryList:any;
  colorList:any;
  finishList:any;
  createProductForm: FormGroup;
  submitted = false;
  loading:boolean=false;

  constructor(private productServise:ProductService ,private colorServise:ColorService,
    private router:Router,private taxesService:TaxesService,private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loading = true;
    this.productServise.createData().subscribe(
      (result) =>{
        if(result.result.status == '200')
          this.discountList = result.data.discountList;
          this.materialList = result.data.materialList;
          this.styleList = result.data.styleList;
          this.categoryList = result.data.categoryList;
          this.finishList = result.data.finishList;
          this.loading = false;
      },
      error=>
      {    
        this.loading = false;
        this.router.navigate(['/dashboard/products']);
      }
    );
    this.colorServise.getColors().subscribe(
      (result) =>{
        if(result.result.status == '200')
          this.colorList = result.data.colorList;
          this.loading = false;
        },
        error=>
        {    
          this.loading = false;
        }
    );
    this.taxesService.getTaxes().subscribe(
      (result) =>{
        if(result.result.status == '200')
          this.taxes = [result.data.taxes];
          this.loading = false;
        },
        error=>
        {    
          this.loading = false;
        }
    );
    this.createProductForm = this.formBuilder.group({
      prodNameAr: ['', [Validators.required]],
      prodNameEn:['', [Validators.required]],
      prodDscAr: ['', [Validators.required]],
      prodDscEn: ['', [Validators.required]],
      images:[null],
      prodPrice: ['', [Validators.required]],
      prodQuantity: ['', [Validators.required]],
      dimHight: ['', [Validators.required]],
      dimWidth: ['', [Validators.required]],
      dimDepth: ['', [Validators.required]],
      warranty: ['', [Validators.required]],
      prodAvailability: [false, [Validators.required]],
      styleNo: ['', [Validators.required]],
      finishNo: ['', [Validators.required]],
      catNo: ['', [Validators.required]],
      taxNo: ['', [Validators.required]],
      discountNo: ['', [Validators.required]],
      prodMaterialList: new FormControl([]),
      prodColorList: new FormControl([])
    });
  }
  get f() { return this.createProductForm.controls; }


  handleFile(event) {
    const formData: FormData = new FormData();

    const files=event.target.files;

    Array.prototype.forEach.call(files, function(file) {
      formData.append("image", file, file.name);
    });

    this.createProductForm.patchValue({images:formData});
    this.createProductForm.updateValueAndValidity();
  }

  addSubColor($value , color)
  {
    color.colorImg="test.jpg";
    color.secondColorNo=$value;
  }

  CreateProduct()
  {
    this.submitted = true;
    if(!this.createProductForm.invalid)
    {
      this.loading=true;
      if(this.createProductForm.value.prodAvailability == true)
        this.createProductForm.value.prodAvailability=1;
      else
      this.createProductForm.value.prodAvailability=0;

      this.productServise.create(this.createProductForm.value).subscribe(
        (result) =>{
          if(result.result.status == '200')
          {
            this.loading=false;
            this.router.navigate(['/dashboard/products']);
          }
          else if((result.result.status == '303' && typeof result.result.errors != "undefined" )|| 
            (result.result.status == '422' && typeof result.result.errors != "undefined")) 
          {
            let validationErrors = mainFunctions.getError(result.result.errors);
            Object.keys(validationErrors).forEach(prop => {
              const formControl = this.createProductForm.get(prop);
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: validationErrors[prop as any]
                });
              }
            });
            console.log(this.createProductForm);
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
