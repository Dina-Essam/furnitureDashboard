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

  constructor(private  customerServise:CustomerService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.customerNo = this.route.snapshot.paramMap.get('id');
    this.customerServise.getById({custNo:this.customerNo}).subscribe(
      (result) =>{
        if(result.result.status == '200')
          this.customer = result.data.customer;
        else
        this.router.navigate(['/dashboard/customers/']);
      }
    );
  }

  deleteCustomer()
  {
    this.customerServise.delete({custNo:this.customerNo}).subscribe(
      (result) =>{
        if(result.result.status == '200')
        this.router.navigate(['/dashboard/customers/']);
      }
    );
  }

}
