import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  template: ''
})
export class LogOutComponent implements OnInit {

  constructor(private _authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this._authService.Logout();
    this.router.navigate(['login']);
  }

}
