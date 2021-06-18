import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-all-materials',
  templateUrl: './all-materials.component.html',
  styleUrls: ['./all-materials.component.css']
})
export class AllMaterialsComponent implements OnInit {

  materials: any;
  loading:boolean=false;

  constructor(private materialServise:MaterialService, private router:Router) {}


  ngOnInit(): void {
    this.loading = true;
    this.materialServise.getlist().subscribe(
      (result) =>{
        if(result.result.status == '200')
          this.materials = result.data.materialList;
        this.loading = false;
      },
      error=>
      {    
        this.loading = false;
      }
    );
  }


  updateMaterial(material:any)
  {
    this.router.navigate(['/dashboard/materials/update-material/'+material.materialNo]);
  }

  deleteMaterial(material:any)
  {
    this.loading = true;

    this.materialServise.delete(material).subscribe(
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
