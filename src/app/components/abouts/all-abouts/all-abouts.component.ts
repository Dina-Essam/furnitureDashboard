import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AboutService } from 'src/app/services/about.service';

@Component({
  selector: 'app-all-abouts',
  templateUrl: './all-abouts.component.html',
  styleUrls: ['./all-abouts.component.css']
})
export class AllAboutsComponent implements OnInit {
  abouts: any;
  loading:boolean=false;

  constructor(private aboutServise:AboutService, private router:Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.aboutServise.getList().subscribe(
      (result) =>{
        if(result.result.status == '200')
          this.abouts = result.data.aboutList;
          this.loading = false;
      },
      error=>
      {    
        this.loading = false;
      }
    );
  }

  updateAbout(about:any)
  {
    this.router.navigate(['/dashboard/abouts/update-about/'+about.aboutNo]);
  }

  deleteAbout(about:any)
  {
    this.loading = true;

    this.aboutServise.delete(about).subscribe(
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
