import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Registeration } from 'src/app/Registration';
import { Store, select } from '@ngrx/store'
import { getUserRegisterItem } from 'src/app/userRegister.reducer';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { addUserLoginData } from 'src/app/userLogin.action';
import { getUserLogoutItem } from 'src/app/userLogout.reducer';
import { addToCart } from 'src/app/cart.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup | any;
  registerData: Registeration | any;
  @Output()
  toggleLogReg: EventEmitter<boolean> = new EventEmitter()
  @Output()
  veirfyingUser: EventEmitter<Registeration> = new EventEmitter()

  private subscription: Subscription;

  constructor(private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder, private store: Store<[]>) {
    this.subscription = this.store.pipe(select(getUserRegisterItem)).subscribe(data => {
      this.registerData = data;
    });
  }

  loginToRegist() {
    this.toggleLogReg.emit(true)
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      // Define your form controls with validations
      passCode: ['', Validators.required],
      email: ['', Validators.required],

      // Add more form controls as needed
    });
  }

  // Convenience getter for easy access to form controls
  get f() {
    return this.form.controls;
  }

  loginForm() {
    if (this.form.invalid) {
      // Mark all form controls as touched to display validation errors
      this.form.markAllAsTouched();
      return;
    }
    const checkUserExist = this.registerData?.find((u: any) => u?.data?.email === this.form?.value?.email && u.data.passCode == this.form.value.passCode);
    if (checkUserExist) {
      this.store.dispatch(addUserLoginData({ item: checkUserExist }))
      // now checking if user login data exist or not 
      this.subscription = this.store.pipe(select(getUserLogoutItem)).subscribe((data: any) => {
        if (data) {
          const _checkUserLogutDataExist = data?.find((u: any) => u?.user?.data?.email === this.form?.value?.email && u?.user?.data?.passCode == this.form?.value?.passCode);
          if (_checkUserLogutDataExist) {
            _checkUserLogutDataExist?.data?.map((ele: any) => {
              this.store.dispatch(addToCart({ item: ele }))
            })
            console.log('checkuserLogutData is not a function: ', _checkUserLogutDataExist)
          }
        }
      });
      this.toastr.success('Succfully user login!', 'Success', { timeOut: 600 })
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 600)
    } else {
      this.toastr.error("User not found!", 'Error', { timeOut: 1000 })
    }
    // this.veirfyingUser.emit(this.form.value)
    // this.toggleLogReg.emit(false)
  }
}
