import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentUser!: user ;
  

  session:any;
  loginForm: FormGroup;
  dataReceived:any

  constructor(private fb: FormBuilder, private router: Router,  private userService :UserService,private authService :AuthService) {
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motdepasse: ['', Validators.required],
    });
  }

  /*submitForm() {
    const formData = this.loginForm.value;

    
    this.http.post('http://localhost:3000/api/user/login', formData,{responseType: 'text'})
      .subscribe((response: any) => {
        localStorage.setItem('token', response.token);

        alert("Connected !");
        this.router.navigate(['/']);
      }, (error) => {
        console.error('Login failed:', error);
      });
  } */

 /* submitForm() {
    const formData = this.loginForm.value;
    this.userService.login(formData).subscribe(
      (response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          
          if (response.role === 'admin') {
            this.router.navigate(['/homeAdmin']);
          } else {
            this.router.navigate(['/home']);
          }
  
          alert('Connected!');
        } else {
          console.error('Invalid response format:', response);
          alert('Invalid email and password!');
        }
      },
      (error) => {
        console.error('Login failed:', error);
        alert('Invalid email and password!');
      }
    );
  } */
  
  
  submitForm() {
    const formData = this.loginForm.value;
    this.authService.login(formData).subscribe(
      (response) => {
        
        this.dataReceived=response

        if (this.dataReceived.role === 'admin') {
        this.authService.saveData(this.dataReceived.token)
        console.log(this.authService.loggedInUser._id)
        console.log(this.authService.loggedInUser.nom)
        console.log(this.authService.loggedInUser.role)
          
          
            this.router.navigate(['/homeAdmin']);
            alert('Connected!');
          } else {
            this.authService.saveData(this.dataReceived.token)
        console.log(this.authService.loggedInUser._id)
        console.log(this.authService.loggedInUser.nom)
        console.log(this.authService.loggedInUser.role)
            this.router.navigate(['/home']);
          
  
          alert('Connected!');
       
      }
      },
      error => 
        console.error('Login failed:', error)
        
    );
      
    
  }

  validate_email() {
    return this.loginForm.get('email')?.invalid && this.loginForm.controls['email'].touched;
  }

  validate_password() {
    return this.loginForm.get('motdepasse')?.invalid && this.loginForm.controls['motdepasse'].touched;
  }
  /*saveData(){
    let data :Partial<user> = {
      nom: this.currentUser.nom,
      email: this.currentUser.email,
      motdepasse:this.currentUser.motdepasse,
    }
    localStorage.setItem('session',JSON.stringify(data));
  
  } */
 /* saveData(user: user) {
    localStorage.setItem('session', JSON.stringify(user));
  } */
  

  ngOnInit(): void {
  }

}
