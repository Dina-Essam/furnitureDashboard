import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/models/image.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-all-category-details',
  templateUrl: './all-category-details.component.html',
  styleUrls: ['./all-category-details.component.css']
})

export class AllCategoryDetailsComponent implements OnInit {

  loading:boolean=false;

  category:{
      catNo: number,
      catNameAr: string,
      catNameEn: string,
      catDsc: string,
      catDscAr: string,
      catDscEn: string,
      categoryName:string,
      images: Image[],
      products: any,
      noOfProducts: number
    };

  constructor(private categoryServise:CategoryService ,private activatedroute: ActivatedRoute ,private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.loading=true;
    const categoryid = this.activatedroute.snapshot.paramMap.get('id');
    this.categoryServise.getByCode({catNo:categoryid}).subscribe(
      (result) =>{
        if(result.result.status == '200')
        {
          this.category = result.data.category;
          console.log(result);
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

  }

  onImgError($event)
  {
    $event.target.src = "assets/images/placeholder-image.png";
  }

  deleteCategory()
  {
    this.categoryServise.delete({catNo:this.category.catNo}).subscribe(
      (result) =>{
        if(result.result.status == '200')
        this.router.navigate(['/dashboard/categories']);
      }
    );
  }
  editCategory()
  {
    this.router.navigate(['/dashboard/categories/update-category/'+this.category.catNo]);
  }

}
