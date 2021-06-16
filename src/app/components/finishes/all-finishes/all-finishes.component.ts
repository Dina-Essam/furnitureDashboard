import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinishService } from 'src/app/services/finish.service';

@Component({
  selector: 'app-all-finishes',
  templateUrl: './all-finishes.component.html',
  styleUrls: ['./all-finishes.component.css']
})
export class AllFinishesComponent implements OnInit {

  finishes: any;
  loading:boolean=false;

  constructor(private finishServise:FinishService, private router:Router) {}


  ngOnInit(): void {
    this.loading = true;
    this.finishServise.getList().subscribe(
      (result) =>{
        if(result.result.status == '200')
          this.finishes = result.data.finishList;
      }
    );
    this.loading = false;
  }

  updateFinish(finish:any)
  {
    this.router.navigate(['/dashboard/finishes/update-finish/'+finish.finishNo]);
  }

  deleteFinish(finish:any)
  {
    this.loading = true;

    this.finishServise.delete(finish).subscribe(
      (result) =>{
        if(result.result.status == '200')
        window.location.reload();
      }
    );
    this.loading = false;

  }

}
