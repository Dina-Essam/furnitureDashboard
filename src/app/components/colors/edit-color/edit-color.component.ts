import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';
import { mainFunctions } from 'src/main';

@Component({
  selector: 'app-edit-color',
  templateUrl: './edit-color.component.html',
  styleUrls: ['./edit-color.component.css']
})
export class EditColorComponent implements OnInit {

  color: { colorNo:number,colorNmEn: string ,colorNmAr: string , colorCode: string };
  createColorForm!: FormGroup;
  submitted = false;
  loading:boolean=false;

  constructor(private colorServise:ColorService , private router:Router,private formBuilder: FormBuilder) {

    const navigation = this.router.getCurrentNavigation();
    if(navigation && navigation.extras?.state)
      this.color = navigation.extras.state as {
        colorNo:number,colorNmEn: string ,colorNmAr: string , colorCode: string
      };
    else
    {
      this.color = { colorNo:-1 ,colorNmEn: '', colorNmAr: '' ,colorCode: '#563d7c'};
      this.router.navigate(['/dashboard/colors']);
    }
   }

  ngOnInit(): void {

    this.createColorForm = this.formBuilder.group({
      colorNo:[],
      colorNmEn: ['', [Validators.required]],
      colorNmAr: ['', [Validators.required]],
      colorCode: ['', [Validators.required, Validators.maxLength(6)]]
    });
    this.createColorForm.patchValue(this.color);
  }
  get f() { return this.createColorForm.controls; }

  EditColor()
  {
      this.submitted = true;
      this.loading=true;
      this.colorServise.update(this.createColorForm.value).subscribe(
        (result) =>{
          if(result.result.status == '200')
          {
            this.loading=false;
            this.router.navigate(['/dashboard/colors']);
          }
          else if(result.result.status === 422 && typeof result.result.errors != "undefined") 
          {
            let validationErrors = mainFunctions.getError(result.result.errors);
            Object.keys(validationErrors).forEach(prop => {
              const formControl = this.createColorForm.get(prop);
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: validationErrors[prop as any]
                });
              }
            });
          }
          this.loading=false;
        },
        error =>{
          this.loading=false;
        }
      );
  }

  addText(event) {
    this.createColorForm.patchValue({
      colorCode: event.target.value
    });
  }

}
