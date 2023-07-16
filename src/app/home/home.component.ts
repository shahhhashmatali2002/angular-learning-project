import { Component, OnInit } from '@angular/core';
import { Registeration } from 'src/app/Registration';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import {Store, select} from '@ngrx/store'
import { getCartItems } from '../cart.reducer';
import { addUserLogoutData, updateUserLogoutData } from '../userLogout.action';
import { removeUserLoginData } from '../userLogin.action';
import { getUserLoginItem } from '../userLogin.reducer';
import { getUserLogoutItem } from '../userLogout.reducer';
import { addToCart, clearCart } from '../cart.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string = ''
  resData: any = [];
  cloneResData: any = []
  uniqueBrand: any = []
  userCartData: any = []
  userCartDataGet: any
  userLoginData: any
  userLogoutData: any
  // resData!: any;

  private subscription: Subscription;
  

  constructor(private store: Store<[]>,private http: HttpClient, private router: Router,private toastr: ToastrService) {
    // getting user Logout data 
    this.subscription = this.store.pipe(select(getUserLogoutItem)).subscribe(data => {
      if(data){
        this.userLogoutData = data
      }
    });
    // getting user Login data 
    this.subscription = this.store.pipe(select(getUserLoginItem)).subscribe(data => {
      if(data){
        this.userLoginData = data
        this.userName = data[0]?.data?.name;
        console.log('userLoginData: ', data[0]?.data?.name)
      }
    });
    
    this.subscription = this.store.pipe(select(getCartItems)).subscribe(data => {
      if(data){
        this.userCartDataGet = data;
      }
    });
  }

  ngOnInit(): void {
    this.fetchingDataFromApi()

  }

  fetchingDataFromApi() {
    
    this.http.get('https://dummyjson.com/products').subscribe(response => {
      const data = (response as any).products
      this.resData = data
      this.cloneResData = data
      this.uniqueBrand = Array.from(new Set(data?.map((item: any) => item.category)));
      console.log('Brand',this.uniqueBrand)
      console.log('Parent Data: ',this.resData)
    });
  }

  filterByCategoryData(data: any) {
    const categoryData = this.resData.filter((u: any) => u.category ===  data);
    if(categoryData && categoryData.length > 0){
      this.cloneResData = categoryData
      console.log(this.cloneResData)
    }else{
      this.cloneResData = this.resData
    }
  }

  singOut() {
    debugger
    // getting data from cart 
    const _userLogoutData = {
      'user': this.userLoginData[0],
      'data': this.userCartDataGet
    }
    const checkUserLogutDataExist = this.userLogoutData?.find((u: any) => u?.user?.data?.email === this.userLoginData[0]?.data?.email && u?.user?.data?.passCode == this.userLoginData[0]?.data?.passCode);
    if(checkUserLogutDataExist){
      this.store.dispatch(updateUserLogoutData({itemId: this.userLoginData[0].id, data: this.userCartDataGet}))
    }else{
      this.store.dispatch(addUserLogoutData({item: _userLogoutData}))
    }
    this.router.navigate([''])
      this.store.dispatch(removeUserLoginData())
      this.store.dispatch(clearCart())

    // this.store.dispatch(addUserLogoutData({item: ''}))
  }
}
