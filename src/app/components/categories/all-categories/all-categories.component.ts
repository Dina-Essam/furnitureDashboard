import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {

  categories: any;
  loading:boolean=false;
  
  constructor(private categoryServise:CategoryService, private router:Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.categoryServise.getList().subscribe(
      (result) =>{
        if(result.result.status == '200')
          this.categories = result.data.categoryList;
          this.loading = false;
      },
      error=>
      {    
        this.loading = false;
      }
    );
  }

  onImgError($event)
  {
    $event.target.src = "assets/images/placeholder-image.png";
  }

  deatilsCategory(categoryNo)
  {
    this.router.navigate(['/dashboard/categories/details-category/'+categoryNo]);
  }

}
