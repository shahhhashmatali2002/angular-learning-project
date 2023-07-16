import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription, timeout } from 'rxjs';
import { faShoppingCart, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { clearCart } from '../cart.actions';
import { getCartItems } from '../cart.reducer';

@Component({
  selector: 'app-buy-item',
  templateUrl: './buy-item.component.html',
  styleUrls: ['./buy-item.component.css']
})
export class BuyItemComponent implements OnInit {
  form: FormGroup | any;
  private subscription: Subscription;
  userPaymentInfo: any

  userCartDataGet: any
  totalPrice: any
  cartIcon = faShoppingCart
  creditCard = faCreditCard

  constructor(private formBuilder: FormBuilder,private store: Store<[]>,private toastr: ToastrService,private router: Router){
    this.subscription = this.store.pipe(select(getCartItems)).subscribe(data => {
      this.userCartDataGet = data;
    });

    this.totalPrice = this.userCartDataGet.map((item: any) => parseInt(item.price)).reduce((sum: any, price: any) => sum + price, 0);
    console.log('userCart Data',this.userCartDataGet)

    if(this.userCartDataGet.length == 0){
      this.router.navigate(['/home'])
    }
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      // Define your form controls with validations
      userName: ['', Validators.required],
      useremail: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)]],
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{13,19}$/)]],
      expMonth: ['', [Validators.required, Validators.pattern(/^(January|February|March|April|May|June|July|August|September|October|November|December)$/i)]],
      expYear: ['', [Validators.required, Validators.pattern(/^(20)\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      
      // Add more form controls as needed
    });
  }

  get f() {
    return this.form.controls;
  }

  checkOutForm() {
    if (this.form.invalid) {
      // Mark all form controls as touched to display validation errors
      this.form.markAllAsTouched();
      return;
    }
    
    const _data = {
      'paymentInfoData': this.form.value,
      'totalPrice': this.totalPrice, 
      'cartData': this.userCartDataGet
    }
    const dataStr = JSON.stringify(_data)
    this.store.dispatch(clearCart())
    this.router.navigate(['/bookingDetials', {dataStr}])
  }
}
