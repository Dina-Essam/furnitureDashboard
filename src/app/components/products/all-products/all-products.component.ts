import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  products: any;
  loading:boolean=false;
  
  constructor(private productServise:ProductService, private router:Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.productServise.getList().subscribe(
      (result) =>{
        if(result.result.status == '200')
          this.products = result.data.productList;
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

  deatilsProduct(productNo)
  {
    this.router.navigate(['/dashboard/products/details-product/'+productNo]);
  }

}
