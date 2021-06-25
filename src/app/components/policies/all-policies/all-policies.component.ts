import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-all-policies',
  templateUrl: './all-policies.component.html',
  styleUrls: ['./all-policies.component.css']
})
export class AllPoliciesComponent implements OnInit {

  policies: any;
  loading:boolean=false;

  constructor(private policyServise:PolicyService, private router:Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.policyServise.getList().subscribe(
      (result) =>{
        if(result.result.status == '200')
          this.policies = result.data.policyList;
          this.loading = false;
      },
      error=>
      {    
        this.loading = false;
      }
    );
  }

  updatePolicy(policy:any)
  {
    this.router.navigate(['/dashboard/policies/update-policy/'+policy.policyNo]);
  }

  deletePolicy(policy:any)
  {
    this.loading = true;

    this.policyServise.delete(policy).subscribe(
      (result) =>{
        if(result.result.status == '200')
        window.location.reload();
        this.loading = false;
      },
      error=>
      {    
        this.loading = false;
      }
    );
  }


}
