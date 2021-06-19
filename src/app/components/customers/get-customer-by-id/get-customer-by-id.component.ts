import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-get-customer-by-id',
  templateUrl: './get-customer-by-id.component.html',
  styleUrls: ['./get-customer-by-id.component.css']
})
export class GetCustomerByIdComponent implements OnInit {
  customerNo: any;
  customer:any;
  loading:boolean=false;

  constructor(private  customerServise:CustomerService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loading=true;

    this.customerNo = this.route.snapshot.paramMap.get('id');
    this.customerServise.getById({custNo:this.customerNo}).subscribe(
      (result) =>{
        if(result.result.status == '200')
        {
          this.customer = result.data.customer;
          this.loading = false;
        }
        else
        {
          this.loading = false;
          this.router.navigate(['/dashboard/customers']);
        }
      },
      error=>
      {    
        this.loading = false;
      }
    );
  }

  onImgError($event)
  {
    $event.target.src = "assets/images/placeholder-male.jpg";
  }

  deleteCustomer()
  {
    this.loading = true;
    this.customerServise.delete({custNo:this.customerNo}).subscribe(
      (result) =>{
        if(result.result.status == '200')
        {
          this.router.navigate(['/dashboard/customers/']);
        }
        this.loading = false;
      },
      error=>
      {    
        this.loading = false;
      }
    );
  }

}
