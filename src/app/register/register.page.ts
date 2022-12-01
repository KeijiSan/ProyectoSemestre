import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { rejects } from 'assert';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authSvc:AuthService,private router: Router) { }

  ngOnInit() {
  }
  async onRegister(email, password,){
    try {
      const user =await this.authSvc.register(email.value, password.value);
      if(user){
        const isVerified=this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      alert('No se pudo registrar usuario')
      console.log(error);
    
      
    }
  }
  private redirectUser(isVerified:boolean){
    if (isVerified){
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['login'])
    }
  }
}
