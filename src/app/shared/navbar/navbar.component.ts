import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'navbar-cmp',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  Languages=environment.languages;
  currentLang =mainFunctions.getCurrentLanguage();
  adminData:any;

  constructor(private authService:AuthService) {  
    this.adminData =  authService.getAdminData();
   }

  ngOnInit(): void {
  }

  onOptionsSelected(event:any)
  {
    let value = event.target.value;
    mainFunctions.setCurrentLanguage(value)
    location.reload()
  }

  onImgError($event)
  {
    $event.target.src = "assets/images/placeholder-male.jpg";
  }


}
