import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Registeration } from 'src/app/Registration';
import {Store, select} from '@ngrx/store'
import { Subscription } from 'rxjs';
import { getUserRegisterItem } from 'src/app/userRegister.reducer';
import { addUserToRegister } from 'src/app/userRegister.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup | any;
  userRegisterData: any

  @Output()
  toggleLogReg: EventEmitter<boolean> = new EventEmitter()

  @Output()
  addUserData: EventEmitter<Registeration> = new EventEmitter()

  private subscription: Subscription;

  constructor(private toastr: ToastrService,private formBuilder: FormBuilder,private store: Store<[]>) {
    this.subscription = this.store.pipe(select(getUserRegisterItem)).subscribe(data => {
      this.userRegisterData = data;
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      // Define your form controls with validations
      name: ['', Validators.required],
      passCode: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      
      // Add more form controls as needed
    });
  }

  // Convenience getter for easy access to form controls
  get f() {
    return this.form.controls;
  }

  regisToLogin() {
    this.toggleLogReg.emit(false)
  }

  registerForm() {
    if (this.form.invalid) {
      // Mark all form controls as touched to display validation errors
      this.form.markAllAsTouched();
      return;
    }

    const checkUserExist = this.userRegisterData?.find((u: any) => u?.data?.email === this.form?.value?.email);
    if(checkUserExist){
      this.toastr.warning('User Already Exist!', 'Verify user', {timeOut: 800})
    }else{
      const userRegId = new Date().getTime().toString()
      const userRegData = {
        'id': userRegId,
        'data': this.form.value
      }
      this.toastr.success('Succfully user register!','Successfully Register',{timeOut: 800})
      setTimeout(() => {
        this.toggleLogReg.emit(false)
      },800)
      // this.addUserData.emit(this.form.value)
      this.store.dispatch(addUserToRegister({item: userRegData}))
    }
  }
}
