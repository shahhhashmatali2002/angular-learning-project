import { Component, OnInit } from '@angular/core';
import { Registeration } from 'src/app/Registration';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-authentication',
  templateUrl: './user-authentication.component.html',
  styleUrls: ['./user-authentication.component.css']
})
export class UserAuthenticationComponent {
  loginRegisterToggle: boolean = false
  registerData: Registeration[] = [];
  
  

  constructor(private router: Router,private toastr: ToastrService) {
    this.registerData = [
      {
        name: 'Hashmat Ali Shah',
        email: 'shahhashmatali667@gmail.com',
        passCode: 'shah0987'
      }
    ]
  }

  addUser(user: Registeration) {
    debugger
    const checkUser = this.registerData.find(u => u.email === user.email && u.name === user.name);
    if(checkUser){
      this.toastr.warning("User already exist!",'warning',{timeOut: 1000})
    }else{
      this.registerData.push(user)
      console.log('Add User: ',this.registerData)
      this.toastr.success('Succfully user register!','Successfully Register',{timeOut: 800})
      setTimeout(() => {
        this.toggleLoginRegister(false)
      },800)
    }
  }

  verifyUser(user: Registeration) {
    const checkUser = this.registerData.find(u => u.email === user.email && u.passCode === user.passCode);
    if(checkUser){
      this.toastr.success('Succfully user login!','Success',{timeOut: 600})
      localStorage.setItem('userName',checkUser.name)
      setTimeout(() => {
        this.router.navigate(['/home']);
      },600)
      return;
    }

    this.toastr.warning("Credential not correct",'warning',{timeOut: 1000})
  }

  toggleLoginRegister(value: boolean) {
    this.loginRegisterToggle=value
    console.log(this.loginRegisterToggle)
  }
}

