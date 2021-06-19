import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  [x: string]: any;

  adminData:any;

  constructor(private authService:AuthService) {  
    this.adminData =  authService.getAdminData();
   }

  ngOnInit() {
  }
  onImgError($event)
  {
    $event.target.src = "assets/images/placeholder-male.jpg";
  }

}
