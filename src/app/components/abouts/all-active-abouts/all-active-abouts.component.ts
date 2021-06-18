import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AboutService } from 'src/app/services/about.service';

@Component({
  selector: 'app-all-active-abouts',
  templateUrl: './all-active-abouts.component.html',
  styleUrls: ['./all-active-abouts.component.css']
})
export class AllActiveAboutsComponent implements OnInit {

  abouts: any;
  loading:boolean=false;

  constructor(private aboutServise:AboutService, private router:Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.aboutServise.getActiveList().subscribe(
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

}
