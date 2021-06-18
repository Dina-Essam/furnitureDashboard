import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-all-cities',
  templateUrl: './all-cities.component.html',
  styleUrls: ['./all-cities.component.css']
})
export class AllCitiesComponent implements OnInit {

  cities: any;
  loading:boolean=false;

  constructor(private cityServise:CityService, private router:Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.cityServise.getlist().subscribe(
      (result) =>{
        if(result.result.status == '200')
          this.cities = result.data.cityList;
          this.loading = false;
      },
      error=>
      {    
        this.loading = false;
      }
    );
  }

  updateCity(city:any)
  {
    this.router.navigate(['/dashboard/cities/update-city/'+city.cityNo]);
  }

  deleteCity(city:any)
  {
    this.loading = true;

    this.cityServise.delete(city).subscribe(
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
