import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { getCartItems } from '../cart.reducer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnChanges {
  private subscription: Subscription;

  userCartDataGet: any

  constructor(private store: Store<[]>,private toastr: ToastrService){
    this.subscription = this.store.pipe(select(getCartItems)).subscribe(data => {
      this.userCartDataGet = data;
    });
    console.log('this.userCartDataGet',this.userCartDataGet)
  }

  ngOnChanges(changes: SimpleChanges): void {
    debugger
    console.log(changes)
}
}
