import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit  {

  myForm!:FormGroup;
  nom:string="";
  email:string="";
  motdepasse:string="";

  constructor(private formBuilder: FormBuilder, private router: Router, private userService :UserService) {
    
    this.myForm = this.formBuilder.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motdepasse: ['', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*+-])(?=.{8,})/)]],

    });

   
  }


/*
  submitForm() {

    const formData = this.myForm.value;
    // Send a POST request to your Node.js API
    this.http.post('http://localhost:3000/api/user/register', formData,{responseType: 'text'})
      .subscribe(
        (resultData : any) => {
          console.log(resultData);
          alert("inscription terminée");
          
        },
        (error) => {
          console.error(error);
         
        }
      );

  } */
  ngOnInit(): void {}

  
  submitForm() {
    const formData = this.myForm.value;
    this.userService.register(formData).subscribe(
      (resultData: any) => {
        console.log(resultData);
        alert("Inscription terminée");
        this.router.navigate(['/log-in']);
      },
      (error) => {
        console.error(error);
        if (error instanceof HttpErrorResponse) {
          console.log(`HTTP Error: ${error.status}, ${error.statusText}`);
          console.log('Response body:', error.error);
        }
      }
    );
  }
  





}
