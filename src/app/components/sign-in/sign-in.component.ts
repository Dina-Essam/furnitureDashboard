import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mainFunctions } from 'src/main';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  LoginForm!: FormGroup;
  submitted = false;
  loading:boolean=false;

  constructor(private authservice:AuthService,
    private router:Router,private formBuilder: FormBuilder) { 
      if (this.authservice.isLoggedIn()) {
        this.router.navigate(['/dashboard']);
      }
    }

  ngOnInit(): void {

    this.LoginForm = this.formBuilder.group({
      admCode: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });


  }

  get f() { return this.LoginForm.controls; }


  Login(){
    this.submitted = true;
    if (!this.LoginForm.invalid) {
      this.loading=true;
      // console.log(this.loginData);
      this.authservice.login(this.LoginForm.value).subscribe(
        (res)=>{
          if(res.result.status == '200'){
            this.loading=false;
            this.router.navigate(['/dashboard']);
          }
          else if(res.result.status === 422 && typeof res.result.errors != "undefined") 
          {
            let validationErrors = mainFunctions.getError(res.result.errors);
            Object.keys(validationErrors).forEach(prop => {
              const formControl = this.LoginForm.get(prop);
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: validationErrors[prop as any]
                });
              }
            });
            this.loading=false;
          }
          this.loading=false;
        }
      );
    }
    this.loading=false;
  }

}
