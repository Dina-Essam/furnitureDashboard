import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css']
})
export class AllCustomersComponent implements OnInit {
  
  customers!: any[];
  pageSize:number=10;
  page:number=1;
  loading:boolean=false;

  constructor(private  customerServise:CustomerService, private router:Router) {}

  ngOnInit(): void {
    this.loading=true;
    this.customerServise.getCustomers().subscribe(
      (result) =>{
        if(result.result.status == '200')
          this.customers = result.data.customerList;
          this.loading = false;
        },
        error=>
        {    
          this.loading = false;
        }
    );
  }

  showCustomer(customerNo:any)
  {
    this.router.navigate(['/dashboard/customers/'+customerNo]);
  }

}
