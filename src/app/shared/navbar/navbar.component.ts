import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'navbar-cmp',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  Languages=environment.languages;
  currentLang = mainFunctions.currentLange;
  constructor() { }

  ngOnInit(): void {
  }

  onOptionsSelected(event:any)
  {
    let value = event.target.value;
    var y: number = +value;
    mainFunctions.currentLange=y;
  }

}
